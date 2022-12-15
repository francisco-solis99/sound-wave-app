import configAPI from '../config';
import deezerAPI from '../deezer';
import { getToken } from '../auth/auth';

/**
 * Get songs with a limit query
 * @param   {int}   limit number of songs to fetch, if null gets all.
 * @return  {array} list of songs.
 */
export const getSongs = async ({ limit, id }) => {
  const idQuery = id ? `?id=${id}` : `?id=${null}`;
  const limitQuery = limit ? `limit=${limit}` : '';
  const query = `${idQuery}&&${limitQuery}`;
  try {
    const urlToFetch = `${configAPI.BASE_URL}/songs${query}`;
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
export const getSongsByUser = async (id) => {
  const idQuery = id ? `?id=${id}` : `?id=${null}`;
  try {
    const urlToFetch = `${configAPI.BASE_URL}/songs${idQuery}`;
    const response = await fetch(urlToFetch);
    return await response.json();
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
export async function getSongsWithSample({ limit, id }) {
  try {
    const songs = await getSongs({ limit, id });
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
export async function createSong(name, year, youtube, artistId, genreId, userId) {
  console.log(name, year, youtube, artistId, genreId, userId)
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getToken()
      },
      body: JSON.stringify({
        name: name,
        year: year,
        linkYT: youtube,
        artistId: artistId,
        genreId: genreId,
        userId: userId
      })
    };
    return await fetch(`${configAPI.BASE_URL}/songs`, requestOptions);
  } catch (err) {
    console.log(err);
  }
}
