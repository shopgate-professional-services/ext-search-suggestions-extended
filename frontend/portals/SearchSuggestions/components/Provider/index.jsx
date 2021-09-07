import React, { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ITEMS_PER_LOAD } from '@shopgate/engage/core';
import { ResultContext } from './context';
import connect from './connector';

/**
 * @returns {JSX}
 */
const SearchSuggestionsProvider = ({
  contentRef, searchPhrase, children,
  getProducts, hash, filterSearch, totalProductCount, products, suggestions,
  sort,
}) => {
  useEffect(() => {
    getProducts({
      params: {
        searchPhrase,
        sort,
      },
    });
  }, [sort, getProducts, searchPhrase]);

  useEffect(() => {
    if (contentRef.current) {
      // eslint-disable-next-line no-param-reassign
      contentRef.current.scrollTop = 0;
    }
  }, [contentRef, searchPhrase]);

  const context = useMemo(() => {
    let productCount = totalProductCount;
    // Total is given, but actually no products
    if (totalProductCount && !products.length) {
      productCount = 0;
    }
    // Total is much more then actual products. Stop abnormal suggesting
    if (totalProductCount > ITEMS_PER_LOAD && products.length < (ITEMS_PER_LOAD / 2)) {
      productCount = products.length;
    }

    return {
      contentRef,
      searchPhrase,
      suggestions,
      totalProductCount: productCount,
      products,
      hash,
      getProducts: () => getProducts({
        params: {
          searchPhrase,
          offset: products.length,
          limit: ITEMS_PER_LOAD,
          sort,
        },
      }),
      filterSearch: () => filterSearch(searchPhrase),
    };
  }, [
    sort,
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
  sort: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  totalProductCount: PropTypes.number,
};

SearchSuggestionsProvider.defaultProps = {
  sort: null,
  hash: null,
  products: null,
  searchPhrase: null,
  suggestions: null,
  totalProductCount: null,
};

/**
 * Only re-render on initial and sequential search phrases
 */
export default memo(
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
);
