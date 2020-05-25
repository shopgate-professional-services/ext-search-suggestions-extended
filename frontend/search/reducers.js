import { FETCH_SEARCH_SUGGESTIONS } from './constants';

/**
 * @param {Object} [state={}] The current state.
 * @param {Object} action The action object.
 * @return {Object} The new state.
 */
const search = (state = '', action) => {
  switch (action.type) {
    case FETCH_SEARCH_SUGGESTIONS:
      return action.searchPhrase || '';
    default:
      return state;
  }
};

export default search;
