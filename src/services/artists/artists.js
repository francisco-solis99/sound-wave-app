import configAPI from '../config';

export const getArtists = async () => {
    try {
        const response = await fetch(`${configAPI.BASE_URL}/artists`);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};
