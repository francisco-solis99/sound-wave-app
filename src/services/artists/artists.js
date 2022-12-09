import configAPI from '../config';

const getArtists = async () => {
    try {
        const response = await fetch(`${configAPI.BASE_URL}/artists`);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export async function getAllArtists() {
    try {
      const data = await getArtists();
      return Object.values(data.rows);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  

