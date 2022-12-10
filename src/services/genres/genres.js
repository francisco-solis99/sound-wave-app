import { getTopsByUser } from '../tops/tops';
import { getSongsByTop } from '../topSongs/topSongs';

export const getGenresByUser = async (idUser) => {
  try {
    const tops = await getTopsByUser(idUser);
    const genresByUserPromises = tops.map(async (top) => {
      const { data } = await getSongsByTop({ topId: top.id });
      const listGenres = data.map(item => item.song.genre);
      return listGenres;
    });

    const genresByUser = await Promise.all(genresByUserPromises);
    const allGenresByUser = genresByUser.flat(Infinity);
    const allGenresByUserNoRepeated = allGenresByUser.filter((genre, index, self) => {
      return self.map(item => item.name).indexOf(genre.name) === index;
    });
    return allGenresByUserNoRepeated;
  } catch (err) {
    console.log(err);
    return [];
  }
};
