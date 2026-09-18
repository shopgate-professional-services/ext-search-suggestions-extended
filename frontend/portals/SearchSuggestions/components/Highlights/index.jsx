import React, { useContext, useEffect } from 'react';
import { I18n, Link, Grid } from '@shopgate/engage/components';
import { SEARCH_PATH } from '@shopgate/engage/search';
import { broadcastLiveMessage } from '@shopgate/engage/a11y';
import { makeStyles } from '@shopgate/engage/styles';
import { ResultContext } from '../Provider/context';

const useStyles = makeStyles()(() => ({
  grid: {
    marginTop: 8,
    marginBottom: 8,
  },
  label: {
    paddingRight: '0.5rem',
  },
  tips: {
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
  },
  tip: {
    '&:not(:last-of-type)': {
      marginRight: '0.5rem',
    },
  },
}));

/**
 * @returns {JSX.Element}
 */
const SearchSuggestionsHighlights = () => {
  const { classes } = useStyles();
  const { suggestions, searchPhrase, totalProductCount } = useContext(ResultContext);

  useEffect(() => {
    broadcastLiveMessage('sp.sse.search.resultCount', { params: { count: totalProductCount } });
  }, [totalProductCount]);

  if (!suggestions || !suggestions.length) {
    return null;
  }

  return (
    <Grid className={classes.grid}>
      <Grid.Item shrink={0} grow={0} className={classes.label}>
        <I18n.Text string="sp.sse.search.highlights" />
      </Grid.Item>
      <Grid.Item grow={1} className={classes.tips}>
        {suggestions.map(suggestion => (
          <Link
            key={suggestion}
            href={`${SEARCH_PATH}?s=${encodeURIComponent(suggestion)}`}
            tag="a"
            className={classes.tip}
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
