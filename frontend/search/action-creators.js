import { FETCH_SEARCH_SUGGESTIONS, FILTER_SEARCH } from './constants';

/**
 * @param {string} searchPhrase .
 * @return {Object}
 */
export const fetchSearchSuggestions = searchPhrase => ({
  type: FETCH_SEARCH_SUGGESTIONS,
  searchPhrase,
});

/**
 * @param {string} searchPhrase .
 * @return {Object}
 */
export const filterSearch = searchPhrase => ({
  type: FILTER_SEARCH,
  searchPhrase,
});
