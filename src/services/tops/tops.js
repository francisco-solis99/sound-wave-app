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

export const createTop = async (e, name, description, userid) => {
  e.preventDefault();
  try {
    let res = await fetch(`${configAPI.BASE_URL}/tops`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        userID: userid
      }),
    });
    await res.json();

    console.log(res);

    // if (res.status === 200) {
    //   setName("");
    //   setEmail("");
    //   setMessage("User created successfully");
    // } else {
    //   setMessage("Some error occured");
    // }
  } catch (err) {
    console.log(err);
  }
};
