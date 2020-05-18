import React, {
  memo, useEffect, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { useRoute } from '@shopgate/engage/core';
import { SEARCH_SUGGESTIONS } from '@shopgate/engage/search';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';
import { ResultContext } from './context';
import { withSearchPhrase } from '../../search/hocs';
import Header from './components/Header';
import Result from './components/Result';
import connect from './connector';

const appBarHeight = themeName.includes('ios') ? 44 : 56;
const baseStyle = {
  left: 0,
  right: 0,
  position: 'fixed',
  overflowY: 'scroll',
  zIndex: 3,
  background: themeConfig.colors.light,
};

/** Styles for different portals */
const styles = {
  [`persistent-search-bar.${SEARCH_SUGGESTIONS}`]: css(baseStyle, {
    top: `calc(var(--safe-area-inset-top) + 56px + ${appBarHeight}px)`,
    bottom: 'var(--safe-area-inset-bottom)',
  }),
  [SEARCH_SUGGESTIONS]: css(baseStyle, {
    top: `calc(var(--safe-area-inset-top) + ${appBarHeight}px)`,
    bottom: 'var(--safe-area-inset-bottom)',
  }),
  // Special offset for ios browse page
  browse: {
    top: `calc(var(--safe-area-inset-top) + 120px + ${appBarHeight}px)`,
  },
};

/**
 * @returns {JSX}
 */
const SearchSuggestions = ({
  name, getProducts, searchPhrase, hash, filterSearch,
  totalProductCount, products, suggestions, isFetching,
}) => {
  const { pattern } = useRoute() || {};
  useEffect(() => {
    getProducts(searchPhrase);
  }, [getProducts, searchPhrase]);

  const contentRef = useRef(null);

  const context = useMemo(() => ({
    contentRef,
    searchPhrase,
    suggestions,
    isFetching,
    totalProductCount,
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
    isFetching,
    filterSearch,
  ]);

  return (
    <div
      className={css(styles[name], pattern === '/browse' ? styles.browse : null)}
      ref={contentRef}
    >
      <ResultContext.Provider value={context}>
        <Header />
        <Result />
      </ResultContext.Provider>
    </div>
  );
};

SearchSuggestions.propTypes = {
  filterSearch: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  hash: PropTypes.string,
  isFetching: PropTypes.bool,
  products: PropTypes.arrayOf(PropTypes.shape()),
  searchPhrase: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  totalProductCount: PropTypes.number,
};

SearchSuggestions.defaultProps = {
  hash: null,
  isFetching: false,
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
    connect(SearchSuggestions),
    (ignore, { searchPhrase }) => {
      if (!searchPhrase) {
        return false;
      }
      return !!(searchPhrase && searchPhrase.length < 3);
    }
  )
);
