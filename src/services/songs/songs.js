import configAPI from '../config';
import deezerAPI from '../deezer';

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


export async function getSongsWithSample() {
  try {
    const { rows: songs } = await getSongs({ limit: 2 });
    const songsWithSample = songs.map(async (song) => {
      const { data } = await getSampleSong(song.name);
      const {
        preview: sample,
      } = data[0];
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
