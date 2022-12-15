import configAPI from '../config';
import { getToken } from '../auth/auth';

/**
 * Get all tops
 * @return  {Promise} response of request.
 */
export const getTops = async ({ limit }) => {
  const limitQuery = limit ? `?limit=${limit}` : '';
  try {
    const response = await fetch(`${configAPI.BASE_URL}/tops${limitQuery}`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Get tops by user id
 * @param   {int}     idUser is of the user logged.
 * @return  {Promise} response of request.
 */
export const getTopsByUser = async (userId) => {
  try {
    const url = `${configAPI.BASE_URL}/tops/user/${userId}`;
    const tops = await fetch(url);
    return await tops.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Create new top
 * @param   {string}    name        name of the top
 * @param   {string}    description description of top
 * @param   {string}    userid      user id
 * @return  {Promise}   response of the request
 */
export async function createTop(name, description, userid) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getToken()
      },
      body: JSON.stringify({
        name: name,
        description: description,
        userId: userid
      })
    };
    return await fetch(`${configAPI.BASE_URL}/tops`, requestOptions);
  } catch (err) {
    console.log(err);
  }
}
