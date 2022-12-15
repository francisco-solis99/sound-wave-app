import configAPI from '../config';
import { getToken } from '../auth/auth';
const IMAGE_URL_DEFAULT =
  'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

/**
 * Get artists with a limit query
 * @param   {int}   limit number of artists to fetch, if null gets all.
 * @return  {array} list of artists.
 */
export const getArtists = async ({ limit, id }) => {
  const idQuery = id ? `?id=${id}` : `?id=${null}`;
  const limitQuery = limit ? `limit=${limit}` : '';
  const query = `${idQuery}&&${limitQuery}`;
  try {
    const urlToFetch = `${configAPI.BASE_URL}/artists${query}`;
    const response = await fetch(urlToFetch);
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Get artists by user id
 * @param   {int}   idUser is of the user logged.
 * @return  {array} list of artists.
 */
export const getArtistsByUser = async (id) => {
  const idQuery = id ? `?id=${id}` : `?id=${null}`;
  try {
    const urlToFetch = `${configAPI.BASE_URL}/artists${idQuery}`;
    const response = await fetch(urlToFetch);
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Create new artist
 * @param   {string}    name     name of the artist
 * @param   {string}    country  country of the artist
 * @param   {string}    youtube  youtube url
 * @param   {string}    imageURL image url
 * @return  {Promise}   response of the request
 */
export async function createArtist(name, country, youtube, imageURL, userId) {
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
        country: country,
        ytchannel: youtube,
        urlImage: imageURL,
        userId: userId
      })
    };
    return await fetch(`${configAPI.BASE_URL}/artists`, requestOptions);
  } catch (err) {
    console.log(err);
  }
}
