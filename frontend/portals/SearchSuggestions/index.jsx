import React, {
  useRef, memo, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useRoute, isIOSTheme } from '@shopgate/engage/core';
import { SEARCH_SUGGESTIONS } from '@shopgate/engage/search';
import { makeStyles } from '@shopgate/engage/styles';
import SearchSuggestionsProvider from './components/Provider';
import { withSearchPhrase } from '../../search/hocs';
import Header from './components/Header';
import Result from './components/Result';

const appBarHeight = isIOSTheme() ? 44 : 56;
const PERSISTENT_SEARCH_BAR_NAME = `persistent-search-bar.${SEARCH_SUGGESTIONS}`;

const useStyles = makeStyles()(theme => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  persistentSearchBar: {
    position: 'relative',
    top: 0,
    height: '100%',
    overflowY: 'scroll',
  },
  suggestions: {
    left: 0,
    right: 0,
    position: 'fixed',
    overflowY: 'scroll',
    zIndex: 3,
    bottom: 'var(--footer-height)',
    top: `calc(var(--safe-area-inset-top) + ${appBarHeight}px)`,
  },
  // Special offset for ios browse page
  browse: {
    top: `calc(var(--safe-area-inset-top) + 120px + ${appBarHeight}px)`,
  },
}));

/**
 * @returns {JSX.Element}
 */
const SearchSuggestions = ({ name, searchPhrase, visible }) => {
  const { classes, cx } = useStyles();
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
      role="presentation"
      tabIndex={-1}
      className={cx(
        classes.root,
        name === PERSISTENT_SEARCH_BAR_NAME ? classes.persistentSearchBar : classes.suggestions,
        pattern === '/browse' && classes.browse
      )}
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
