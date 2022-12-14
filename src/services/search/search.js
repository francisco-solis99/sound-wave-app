import configAPI from '../config';

/**
 * Search query
 * @param   {string}   query    search query
 * @param   {string}   toSearch what to search
 * @return  {array}     list of results.
 */
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
