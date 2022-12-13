import configAPI from '../config';

export const searchQuery = async ({ query, toSearch }) => {
  const searchQuery = query ? `?query=${query}` : '';
  try {
    const urlToFetch = `${configAPI.BASE_URL}/search/${toSearch}${searchQuery}`;
    const response = await fetch(urlToFetch);
    const { data: searchResults } = await response.json();
    return searchResults;
  } catch (err) {
    console.log(err);
    return [];
  }
};
