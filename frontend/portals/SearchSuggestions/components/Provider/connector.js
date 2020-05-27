import { connect } from 'react-redux';
import { ITEMS_PER_LOAD } from '@shopgate/engage/core';
import { fetchProducts, getProductsResult } from '@shopgate/engage/product';
import { getSuggestions } from '@shopgate/engage/search';
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
  filterSearch: searchPhrase => dispatch(filterSearch(searchPhrase)),
});

export default connect(mapStateToProps, mapDispatchToProps);
