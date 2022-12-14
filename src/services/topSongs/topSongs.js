import configAPI from '../config';
import { getTops, getTopsByUser } from '../tops/tops';
import { getToken } from '../auth/auth';


export const getSongsByTop = async ({ topId }) => {
  try {
    const response = await fetch(`${configAPI.BASE_URL}/topList/top/${topId}`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getSongsTops = async (limit = null) => {
  try {
    const { rows: tops } = await getTops({ limit });
    const songsByTop = tops.map(async (top) => {
      const { data } = await getSongsByTop({ topId: top.id });
      const listSongs = data.map(item => item.song);
      return {
        ...top,
        songs: listSongs
      };
    });

    return await Promise.all(songsByTop);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getSongsTopByUser = async (idUser) => {
  try {
    const tops = await getTopsByUser(idUser);
    const topSongsByUser = tops.map(async (top) => {
      const { data } = await getSongsByTop({ topId: top.id });
      const listSongs = data.map(item => item.song);
      return {
        ...top,
        songs: listSongs
      };
    });

    return await Promise.all(topSongsByUser);
  } catch (err) {
    console.log(err);
    return [];
  }
};


// Add a song to a top
export const createSongTop = async (topId, songId) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getToken()
      },
      body: JSON.stringify({
        topId,
        songId
      })
    };
    return await fetch(`${configAPI.BASE_URL}/topList`, requestOptions);
  } catch (err) {
    console.log(err);
  }
};
