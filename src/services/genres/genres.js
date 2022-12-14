import configAPI from '../config';
import { getTopsByUser } from '../tops/tops';
import { getSongsByTop } from '../topSongs/topSongs';
import { getToken } from '../auth/auth';

/**
 * Get genres with a limit query
 * @param   {int}   limit number of genres to fetch, if null gets all.
 * @return  {array} list of genres.
 */
export const getGenres = async ({ limit }) => {
  const limitQuery = limit ? `?limit=${limit}` : '';
  try {
    const urlToFetch = `${configAPI.BASE_URL}/genres${limitQuery}`;
    const response = await fetch(urlToFetch);
    const { rows } = await response.json();
    return rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Get genres by user id
 * @param   {int}   idUser is of the user logged.
 * @return  {array} list of genres.
 */
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

/**
 * Create new genre
 * @param   {string}    name     name of the genre
 * @param   {string}    imageURL image url
 * @return  {Promise}   response of the request
 */
export async function createGenre(name, imageURL) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getToken()
      },
      body: JSON.stringify({
        name: name,
        urlImage: imageURL
      })
    };
    return await fetch(`${configAPI.BASE_URL}/genres`, requestOptions);
  } catch (err) {
    console.log(err);
  }
}
