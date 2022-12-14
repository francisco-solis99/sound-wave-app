import configAPI from '../config';

let token = '';

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

export const logout = async () => {
  setToken('');
  window.localStorage.removeItem('loggedSoundwaveApp');
};

export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => token;

export const getUser = () => window.localStorage.getItem('loggedSoundwaveApp');
