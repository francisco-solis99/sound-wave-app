import configAPI from '../config';
import deezerAPI from '../deezer';
import { getTopsByUser } from '../tops/tops';
import { getSongsByTop } from '../topSongs/topSongs';

export const getSongs = async ({ limit }) => {
  const limitQuery = limit ? `?limit=${limit}` : '';
  try {
    const urlToFetch = `${configAPI.BASE_URL}/songs${limitQuery}`;
    const response = await fetch(urlToFetch);
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export async function getSampleSong(nameSong) {
  const urlToFetch = `${deezerAPI.baseURL}/search?q=${nameSong}`;
  try {
    const response = await fetch(urlToFetch, deezerAPI.options);
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getSongsWithSample({ limit }) {
  try {
    const { rows: songs } = await getSongs({ limit });
    const songsWithSample = songs.map(async (song) => {
      const { data } = await getSampleSong(song.name);
      if (!data.length) return song;
      const correctData = data.find(item => item.artist.name === song.artist.name);
      const {
        preview: sample,
      } = correctData ?? data[0];
      return {
        ...song,
        sample,
      };
    });
    return await Promise.all(songsWithSample);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getSongsByUser = async (idUser) => {
  try {
    const tops = await getTopsByUser(idUser);
    const songsByUserPromises = tops.map(async (top) => {
      const { data } = await getSongsByTop({ topId: top.id });
      const listSongs = data.map(item => item.song);
      return listSongs;
    });

    const songsByUser = await Promise.all(songsByUserPromises);
    const allSongsByUser = songsByUser.flat(Infinity);
    const allSongsByUserNoRepeated = allSongsByUser.filter((song, index, self) => {
      return self.map(item => item.name).indexOf(song.name) === index;
    });
    return allSongsByUserNoRepeated;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export async function createSong(name, year, youtube, artistId, genreId) {
  try {
    // TODO: Import token
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'token'
      },
      body: JSON.stringify({
        name: name,
        year: year,
        linkYT: youtube,
        artistId: artistId,
        genreId: genreId
      })
    };
    return await fetch(`${configAPI.BASE_URL}/songs`, requestOptions);
  } catch (err) {
    console.log(err);
  }
}