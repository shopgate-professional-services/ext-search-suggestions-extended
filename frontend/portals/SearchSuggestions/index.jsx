import React, {
  useRef, memo, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { useRoute } from '@shopgate/engage/core';
import { SEARCH_SUGGESTIONS } from '@shopgate/engage/search';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';
import SearchSuggestionsProvider from './components/Provider';
import { withSearchPhrase } from '../../search/hocs';
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
  color: themeConfig.colors.dark,
  bottom: 'var(--footer-height)',
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
const SearchSuggestions = ({ name, searchPhrase, visible }) => {
  const { pattern } = useRoute() || {};
  const contentRef = useRef(null);
  const [statePhrase, setStatePhrase] = useState(searchPhrase);

  // Hook into fetching suggestion to grab a search phrase
  useEffect(() => { setStatePhrase(searchPhrase); }, [searchPhrase]);

  if (!visible || !statePhrase || statePhrase.length <= 2) {
    return null;
  }

  return (
    <div
      className={css(styles[name], pattern === '/browse' ? styles.browse : null)}
      ref={contentRef}
    >
      <SearchSuggestionsProvider contentRef={contentRef} searchPhrase={statePhrase}>
        <Header />
        <Result />
      </SearchSuggestionsProvider>
    </div>
  );
};

SearchSuggestions.propTypes = {
  name: PropTypes.string.isRequired,
  searchPhrase: PropTypes.string,
  visible: PropTypes.bool,
};

SearchSuggestions.defaultProps = {
  searchPhrase: '',
  visible: true,
};

// Do not re-render due to changed portal props
export default memo(withSearchPhrase(SearchSuggestions));
