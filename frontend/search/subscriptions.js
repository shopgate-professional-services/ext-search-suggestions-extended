import { routeDidEnter$ } from '@shopgate/pwa-common/streams';
import {
  historyPush, main$, appDidStart$, mutableActions,
} from '@shopgate/engage/core';
import { SEARCH_FILTER_PATTERN, SEARCH_PATH, fetchSearchSuggestions } from '@shopgate/engage/search';
import { fetchSearchSuggestions as fetchSearchSuggestionsAction } from './action-creators';
import { FILTER_SEARCH } from './constants';

/**
 * Subscriptions
 * @param {Function} subscribe subscribe
 */
export default (subscribe) => {
  subscribe(appDidStart$, ({ dispatch }) => {
    fetchSearchSuggestions.useBefore((searchPhrase) => {
      dispatch(fetchSearchSuggestionsAction(searchPhrase));
      return mutableActions.next(searchPhrase);
    });
  });

  const filterSearch$ = main$.filter(({ action }) => action.type === FILTER_SEARCH);
  subscribe(filterSearch$, ({ dispatch, action }) => {
    const { searchPhrase } = action;

    // 1 time subscription
    subscribe(routeDidEnter$.first().delay(250), ({ action: innerAction }) => {
      dispatch(historyPush({
        pathname: `${SEARCH_FILTER_PATTERN}?s=${encodeURIComponent(searchPhrase)}`,
        // Inject id of the search route as parentId into the filter route state. It's needed by
        // the logic of the filter route to update the filters inside the search route.
        ...innerAction?.route?.id && {
          state: {
            parentId: innerAction.route.id,
          },
        },
      }));
    });

    dispatch(historyPush({
      pathname: `${SEARCH_PATH}?s=${encodeURIComponent(searchPhrase)}`,
    }));
  });
};
