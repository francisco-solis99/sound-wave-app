import configAPI from '../config';
import { getTopsByUser } from '../tops/tops';
import { getSongsByTop } from '../topSongs/topSongs';


// const getArtists = async () => {
//   try {
//     const response = await fetch(`${configAPI.BASE_URL}/artists`);
//     return await response.json();
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };

export const getArtists = async ({ limit }) => {
  const limitQuery = limit ? `?limit=${limit}` : '';
  try {
    const urlToFetch = `${configAPI.BASE_URL}/artists${limitQuery}`;
    const response = await fetch(urlToFetch);
    const { rows } = await response.json();
    return rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getArtistsByUser = async (idUser) => {
  try {
    const tops = await getTopsByUser(idUser);
    const artistsByUserPromises = tops.map(async (top) => {
      const { data } = await getSongsByTop({ topId: top.id });
      const listArtists = data.map(item => item.song.artist);
      return listArtists;
    });

    const artistsByUser = await Promise.all(artistsByUserPromises);
    const allArtistsByUser = artistsByUser.flat(Infinity);
    const allArtistsByUserNoRepeated = allArtistsByUser.filter((artist, index, self) => {
      return self.map(item => item.name).indexOf(artist.name) === index;
    });
    return allArtistsByUserNoRepeated;
  } catch (err) {
    console.log(err);
    return [];
  }
};

