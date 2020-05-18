const REDUCER_KEY = '@shopgate-project/search-suggestions-extended/reducers';

/**
 * @param {Object} state .
 * @return {string}
 */
export const getSearchPhrase = state => state.extensions[REDUCER_KEY] || '';
