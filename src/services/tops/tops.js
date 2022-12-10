import configAPI from '../config';

export const getTops = async () => {
  try {
    const response = await fetch(`${configAPI.BASE_URL}/tops`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};


export const getTopsByUser = async (userId) => {
  try {
    const tops = await fetch(`${configAPI.BASE_URL}/tops/user/${userId}`);
    return await tops.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};
