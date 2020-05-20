import React, { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ResultContext } from './context';
import { withSearchPhrase } from '../../../../search/hocs';
import connect from './connector';

/**
 * @returns {JSX}
 */
const SearchSuggestionsProvider = ({
  contentRef, children, getProducts, searchPhrase, hash, filterSearch,
  totalProductCount, products, suggestions,
}) => {
  useEffect(() => {
    getProducts(searchPhrase);
    if (contentRef.current) {
      // eslint-disable-next-line no-param-reassign
      contentRef.current.scrollTop = 0;
    }
  }, [contentRef, getProducts, searchPhrase]);

  const context = useMemo(() => ({
    contentRef,
    searchPhrase,
    suggestions,
    // Safety check if actual products are given
    // eslint-disable-next-line no-nested-ternary
    totalProductCount: totalProductCount
      ? products.length
        ? totalProductCount
        : 0
      : totalProductCount,
    products,
    hash,
    getProducts: offset => getProducts(searchPhrase, offset),
    filterSearch,
  }), [
    searchPhrase,
    getProducts,
    totalProductCount,
    products,
    hash,
    contentRef,
    suggestions,
    filterSearch,
  ]);

  return (
    <ResultContext.Provider value={context}>
      {children}
    </ResultContext.Provider>
  );
};

SearchSuggestionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  contentRef: PropTypes.shape().isRequired,
  filterSearch: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  hash: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape()),
  searchPhrase: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  totalProductCount: PropTypes.number,
};

SearchSuggestionsProvider.defaultProps = {
  hash: null,
  products: null,
  searchPhrase: null,
  suggestions: null,
  totalProductCount: null,
};

/**
 * Only re-render on initial and sequential search phrases
 */
export default withSearchPhrase(
  memo(
    connect(SearchSuggestionsProvider),
    ({ searchPhrase: prevSearchPhrase }, { searchPhrase }) => {
      if (prevSearchPhrase === searchPhrase) {
        return true;
      }
      if (!searchPhrase) {
        return false;
      }
      return !!(searchPhrase && searchPhrase.length < 3);
    }
  )
);
