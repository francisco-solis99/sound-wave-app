import configAPI from '../config';

const getGenres = async ({ limit }) => {
    const limitQuery = limit ? `?limit=${limit}` : '';
    try {
        const urlToFetch = `${configAPI.BASE_URL}/genres${limitQuery}`;
        const response = await fetch(urlToFetch);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export async function getAllGenres() {
    try {
        const data = await getGenres({ limit: 10 });
        return Object.values(data.rows);
    } catch (err) {
        console.log(err);
        return [];
    }
}