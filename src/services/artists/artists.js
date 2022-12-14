import configAPI from '../config';
import { getTopsByUser } from '../tops/tops';
import { getSongsByTop } from '../topSongs/topSongs';

/**
 * Get artists with a limit query
 * @param   {int}   limit number of artists to fetch, if null gets all.
 * @return  {array} list of artists.
 */
export const getArtists = async ({ limit }) => {
  const limitQuery = limit ? `?limit=${limit}` : '';
  try {
    const urlToFetch = `${configAPI.BASE_URL}/artists${limitQuery}`;
    const response = await fetch(urlToFetch);
    const { rows } = await response.json();
    return rows;
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
export const getArtistsByUser = async (idUser) => {
  try {
    const tops = await getTopsByUser(idUser);
    const artistsByUserPromises = tops.map(async (top) => {
      const { data } = await getSongsByTop({ topId: top.id });
      const listArtists = data.map(item => item.song.artist);
      return listArtists;
    });
    const artistsByUser = await Promise.all(artistsByUserPromises);
    const allArtistsByUser = artistsByUser.flat(Infinity);
    const allArtistsByUserNoRepeated = allArtistsByUser.filter((artist, index, self) => {
      return self.map(item => item.name).indexOf(artist.name) === index;
    });
    return allArtistsByUserNoRepeated;
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
export async function createArtist(name, country, youtube, imageURL) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'token'
      },
      body: JSON.stringify({
        name: name,
        country: country,
        ytchannel: youtube,
        urlImage: imageURL
      })
    };
    return await fetch(`${configAPI.BASE_URL}/artists`, requestOptions);
  } catch (err) {
    console.log(err);
  }
}
