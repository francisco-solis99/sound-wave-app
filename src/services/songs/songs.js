import configAPI from '../config';
import deezerAPI from '../deezer';
import { getTopsByUser } from '../tops/tops';
import { getSongsByTop } from '../topSongs/topSongs';

/**
 * Get songs with a limit query
 * @param   {int}   limit number of songs to fetch, if null gets all.
 * @return  {array} list of songs.
 */
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

/**
 * Get songs by user id
 * @param   {int}   idUser is of the user logged.
 * @return  {array} list of songs.
 */
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

/**
 * Get songs sample by song name
 * @param   {string}   nameSong name of the song.
 * @return  {Promise}  
 */
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

/**
 * Get a limit songs with samples
 * @param   {int}   limit number of songs to fetch, if null gets all.
 * @return  {Promise}  
 */
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

/**
 * Create new song
 * @param   {string}    name      name of the song
 * @param   {string}    year      year
 * @param   {string}    youtube   youtube url 
 * @param   {string}    artistId  artist unique id
 * @param   {string}    genreId   genre unique id
 * @return  {Promise}   response of the request
 */
export async function createSong(name, year, youtube, artistId, genreId) {
  try {
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