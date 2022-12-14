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

export async function createTop(name, description, userid) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'token'
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
