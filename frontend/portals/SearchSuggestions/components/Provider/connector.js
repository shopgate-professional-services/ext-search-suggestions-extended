import { connect } from 'react-redux';
import { fetchProducts, getProductsResult } from '@shopgate/engage/product';
import { makeGetDefaultSortOrder, SORT_SCOPE_SEARCH } from '@shopgate/engage/filter';
import { getCurrentRoute } from '@shopgate/engage/core';
import { getSuggestions } from '@shopgate/engage/search';
import { filterSearch } from '../../../../search/action-creators';

/**
 * @return {Function}
 */
const mapStateToProps = () => {
  let getDefaultSortOrder = null;

  if (makeGetDefaultSortOrder) {
    // Engage version with merchant settings
    getDefaultSortOrder = makeGetDefaultSortOrder();
  }

  return (state, { searchPhrase = ' ' }) => {
    const currentRoute = getCurrentRoute(state);
    const { filters } = currentRoute.state;
    const sort = getDefaultSortOrder && getDefaultSortOrder(state, { scope: SORT_SCOPE_SEARCH });

    const hashParams = {
      searchPhrase,
      sort,
      filters,
    };

    return {
      productsResult: getProductsResult(state, hashParams),
      sort,
      filters,
      suggestions: getSuggestions(state, { searchPhrase }),
    };
  };
};

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = {
  getProducts: fetchProducts,
  filterSearch,
};

export default connect(mapStateToProps, mapDispatchToProps);
