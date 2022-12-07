import configAPI from '../config';
import { getTops } from '../tops/tops';

export const getSongsByTop = async ({ topId }) => {
  try {
    const response = await fetch(`${configAPI.BASE_URL}/topList/top/${topId}`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getSongsTops = async () => {
  try {
    const { rows: tops } = await getTops();
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
