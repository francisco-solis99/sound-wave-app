import configAPI from '../config';
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

const getGenres = async ({ limit }) => {
  const limitQuery = limit ? `?limit=${limit}` : '';
  try {
    const urlToFetch = `${configAPI.BASE_URL}/genres${limitQuery}`;
    const response = await fetch(urlToFetch);
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export async function getAllGenres() {
  try {
    const data = await getGenres({ limit: 10 });
    return Object.values(data.rows);
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function createGenre(e, name, imageURL) {
  e.preventDefault();
  try {
    const requestOptions = {
      // TODO: check if genre exists
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        urlImage: imageURL
      })
    };
    // TODO: Update URL
    return await fetch('http://localhost:4000/api/genres', requestOptions);
  } catch (err) {
    console.log(err);
  }
}
