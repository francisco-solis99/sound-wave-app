import configAPI from '../config';

let token = '';

/**
 * Login in Soundwave app
 * @param   {object}   credentials to login .
 * @return  {object} login response .
 */
export const login = async (credentials) => {
  try {
    const response = await fetch(`${configAPI.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const { ok } = response;
    const user = await response.json();
    return { ok, user };
  } catch (error) {
    console.log(error);
  }
};

/**
 * Signup in Soundwave app
 * @param   {object} data to signup .
 * @return  {object} signup response .
 */
export const signUp = async (data) => {
  try {
    const response = await fetch(`${configAPI.BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const { ok } = response;
    const result = await response.json();
    return { ok, result };
  } catch (error) {
    console.log(error);
  }
};

/**
 * Logout in Soundwave app.
 */
export const logout = async () => {
  setToken('');
  window.localStorage.removeItem('loggedSoundwaveApp');
};

/**
 * Set the token variable
 * @param   {String} new user token
 */
export const setToken = (newToken) => {
  token = newToken;
};

/**
 * Get the token variable
 * @return  {String} user token
 */
export const getToken = () => token;

/**
 * get user from localstorage
 * @return  {String|undefined} user item from localstorage
 */
export const getUser = () => window.localStorage.getItem('loggedSoundwaveApp');
