import configAPI from '../config';
import { getToken } from '../auth/auth';
const IMAGE_URL_DEFAULT =
  'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

/**
 * Get genres with a limit query
 * @param   {int}   limit number of genres to fetch, if null gets all.
 * @return  {array} list of genres.
 */
export const getGenres = async ({ limit, id }) => {
  const idQuery = id ? `?id=${id}` : `?id=${null}`;
  const limitQuery = limit ? `limit=${limit}` : '';
  const query = `${idQuery}&&${limitQuery}`;
  try {
    const urlToFetch = `${configAPI.BASE_URL}/genres${query}`;
    const response = await fetch(urlToFetch);
    return await response.json();
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
export const getGenresByUser = async (id) => {
  const idQuery = id ? `?id=${id}` : `?id=${null}`;
  try {
    const urlToFetch = `${configAPI.BASE_URL}/genres${idQuery}`;
    const response = await fetch(urlToFetch);
    return await response.json();
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
export async function createGenre(name, imageURL, userId) {
  if (imageURL === '') imageURL = IMAGE_URL_DEFAULT;
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getToken()
      },
      body: JSON.stringify({
        name: name,
        urlImage: imageURL,
        userId: userId
      })
    };
    return await fetch(`${configAPI.BASE_URL}/genres`, requestOptions);
  } catch (err) {
    console.log(err);
  }
}
