import { connect } from 'react-redux';
import { fetchProducts, getProductsResult } from '@shopgate/engage/product';
import { getSuggestions, getSuggestionsFetchingState } from '@shopgate/engage/search';
import { ITEMS_PER_LOAD } from '@shopgate/pwa-common/constants/DisplayOptions';
import { filterSearch } from '../../../../search/action-creators';

/**
 * @param {Object} state .
 * @param {Object} props .
 * @return {Object}
 */
const mapStateToProps = (state, { searchPhrase }) => {
  const hashParams = {
    searchPhrase: searchPhrase || ' ',
    params: {
      pipeline: 'shopgate.catalog.getProductsBySearchPhrase',
    },
  };

  return {
    ...getProductsResult(state, hashParams),
    suggestions: getSuggestions(state, { searchPhrase }),
    isFetching: getSuggestionsFetchingState(state, { searchPhrase }),
  };
};

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  getProducts: (searchPhrase, offset = 0) => dispatch(fetchProducts({
    pipeline: 'shopgate.catalog.getProductsBySearchPhrase',
    params: {
      searchPhrase,
      offset,
      limit: ITEMS_PER_LOAD,
    },
  })),
  filterSearch: () => dispatch(filterSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps);
