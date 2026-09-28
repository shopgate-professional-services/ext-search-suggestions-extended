import React, { useContext } from 'react';
import { Grid, I18n, PlaceholderParagraph } from '@shopgate/engage/components';
import { Button } from '@shopgate/engage/components/v2';
import { makeStyles } from '@shopgate/engage/styles';
import { ResultContext } from '../Provider/context';
import Highlights from '../Highlights';
import config from '../../../../config.json';

const { layout } = config;

const {
  showResultCount = true,
  showFilterButton = true,
  showHighlights = true,
} = layout || {};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '8px 16px',
    background: theme.palette.background.default,
    position: 'sticky',
    top: '-2px', // Remove gap for content scrolling
    zIndex: 6,
  },
  header: {
    fontWeight: 500,
  },
  filterButton: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
  },
}));

/**
 * @returns {JSX.Element}
 */
const SearchSuggestionsHeader = () => {
  const { classes } = useStyles();
  const { totalProductCount, filterSearch, searchPhrase } = useContext(ResultContext);

  if (!showFilterButton && !showResultCount && !showHighlights) {
    return null;
  }

  return (
    <div role="presentation" className={classes.wrapper} tabIndex={-1}>
      <PlaceholderParagraph ready={totalProductCount !== null}>
        {(showResultCount || showFilterButton) && (
          <Grid className={classes.header}>
            <Grid.Item grow={1}>
              {showResultCount && (
                <I18n.Text string="sp.sse.search.resultCount" params={{ count: totalProductCount || 0 }} />
              )}
            </Grid.Item>
            {searchPhrase && searchPhrase.length >= 3 && (
              <Grid.Item grow={0}>
                {showFilterButton && (
                  <Button onClick={filterSearch} variant="link" className={classes.filterButton}>
                    <I18n.Text string="titles.filter" />
                  </Button>
                )}
              </Grid.Item>
            )}
          </Grid>
        )}
        {showHighlights && <Highlights />}
      </PlaceholderParagraph>
    </div>
  );
};

export default SearchSuggestionsHeader;
