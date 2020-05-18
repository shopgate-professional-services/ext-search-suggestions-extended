import React, { useContext } from 'react';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';
import { I18n, Link } from '@shopgate/engage/components';
import { SEARCH_PATH } from '@shopgate/engage/search';
import { ResultContext } from '../../context';

const styles = {
  wrapper: css({
    marginTop: themeConfig.variables.gap.small,
    marginBottom: themeConfig.variables.gap.small,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ' > *': {
      marginRight: '0.5rem',
    },
  }).toString(),
};

/**
 * @returns {JSX}
 */
const SearchSuggestionsHighlights = () => {
  const { suggestions, searchPhrase, isFetching } = useContext(ResultContext);

  if (isFetching || !suggestions || !suggestions.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <I18n.Text string="sp.sse.search.highlights" />
      {suggestions.map(suggestion => (
        <Link
          key={suggestion}
          href={`${SEARCH_PATH}?s=${encodeURIComponent(suggestion)}`}
          tag="a"
        >
          <strong>{suggestion.slice(0, searchPhrase.length)}</strong>
          {suggestion.slice(searchPhrase.length)}
        </Link>
      ))}
    </div>
  );
};

export default SearchSuggestionsHighlights;
