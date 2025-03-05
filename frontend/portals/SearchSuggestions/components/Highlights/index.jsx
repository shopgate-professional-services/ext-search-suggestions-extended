import React, { useContext, useEffect } from 'react';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';
import { I18n, Link, Grid } from '@shopgate/engage/components';
import { SEARCH_PATH } from '@shopgate/engage/search';
import { broadcastLiveMessage } from '@shopgate/engage/a11y';
import { ResultContext } from '../Provider/context';

const styles = {
  grid: css({
    marginTop: themeConfig.variables.gap.small,
    marginBottom: themeConfig.variables.gap.small,
  }).toString(),
  label: css({
    paddingRight: '0.5rem',
  }).toString(),
  tips: css({
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
  }).toString(),
  tip: css({
    ':not(:last-of-type)': {
      marginRight: '0.5rem',
    },
  }).toString(),
};

/**
 * @returns {JSX.Element}
 */
const SearchSuggestionsHighlights = () => {
  const { suggestions, searchPhrase, totalProductCount } = useContext(ResultContext);

  useEffect(() => {
    broadcastLiveMessage('sp.sse.search.resultCount', { params: { count: totalProductCount } });
  }, [totalProductCount]);

  if (!suggestions || !suggestions.length) {
    return null;
  }

  return (
    <Grid className={styles.grid}>
      <Grid.Item shrink={0} grow={0} className={styles.label}>
        <I18n.Text string="sp.sse.search.highlights" />
      </Grid.Item>
      <Grid.Item grow={1} className={styles.tips}>
        {suggestions.map(suggestion => (
          <Link
            key={suggestion}
            href={`${SEARCH_PATH}?s=${encodeURIComponent(suggestion)}`}
            tag="a"
            className={styles.tip}
            tabIndex={0}
          >
            <strong>{suggestion.slice(0, searchPhrase.length)}</strong>
            {suggestion.slice(searchPhrase.length)}
          </Link>
        ))}
      </Grid.Item>
    </Grid>
  );
};

export default SearchSuggestionsHighlights;
