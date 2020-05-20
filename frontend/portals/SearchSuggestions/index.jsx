import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { useRoute } from '@shopgate/engage/core';
import { SEARCH_SUGGESTIONS } from '@shopgate/engage/search';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';
import SearchSuggestionsProvider from './components/Provider';
import Header from './components/Header';
import Result from './components/Result';

const appBarHeight = themeName.includes('ios') ? 44 : 56;
const baseStyle = {
  left: 0,
  right: 0,
  position: 'fixed',
  overflowY: 'scroll',
  zIndex: 3,
  background: themeConfig.colors.light,
  bottom: 'calc(var(--safe-area-inset-bottom) + var(--footer-height))',
};

/** Styles for different portals */
const styles = {
  [`persistent-search-bar.${SEARCH_SUGGESTIONS}`]: css(baseStyle, {
    top: `calc(var(--safe-area-inset-top) + 56px + ${appBarHeight}px)`,
  }),
  [SEARCH_SUGGESTIONS]: css(baseStyle, {
    top: `calc(var(--safe-area-inset-top) + ${appBarHeight}px)`,
  }),
  // Special offset for ios browse page
  browse: {
    top: `calc(var(--safe-area-inset-top) + 120px + ${appBarHeight}px)`,
  },
};

/**
 * @returns {JSX}
 */
const SearchSuggestions = ({ name }) => {
  const { pattern } = useRoute() || {};
  const contentRef = useRef(null);

  return (
    <div
      className={css(styles[name], pattern === '/browse' ? styles.browse : null)}
      ref={contentRef}
    >
      <SearchSuggestionsProvider contentRef={contentRef}>
        <Header />
        <Result />
      </SearchSuggestionsProvider>
    </div>
  );
};

SearchSuggestions.propTypes = {
  name: PropTypes.string.isRequired,
};

// Do not re-render due to changed portal props
export default memo(SearchSuggestions, () => true);
