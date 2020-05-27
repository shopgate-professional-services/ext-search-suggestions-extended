import React, { useContext } from 'react';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';
import {
  Button, Grid, I18n, PlaceholderParagraph,
} from '@shopgate/engage/components';
import { ResultContext } from '../Provider/context';
import Highlights from '../Highlights';
import { layout } from '../../../../config';

const {
  showResultCount = true,
  showFilterButton = true,
  showHighlights = true,
} = layout || {};

const styles = {
  wrapper: css({
    padding: `${themeConfig.variables.gap.small}px ${themeConfig.variables.gap.big}px`,
    paddingTop: themeConfig.variables.gap.small,
    background: themeConfig.colors.background,
    position: 'sticky',
    top: '-2px', // Remove gap for content scrolling
    zIndex: 4,
  }).toString(),
  header: css({
    fontWeight: 500,
  }).toString(),
};

/**
 * @returns {JSX}
 */
const SearchSuggestionsHeader = () => {
  const { totalProductCount, filterSearch, searchPhrase } = useContext(ResultContext);

  if (!showFilterButton && !showResultCount && !showHighlights) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <PlaceholderParagraph ready={totalProductCount !== null}>
        {(showResultCount || showFilterButton) && (
          <Grid className={styles.header}>
            <Grid.Item grow={1}>
              {showResultCount && (
                <I18n.Text string="sp.sse.search.resultCount" params={{ count: totalProductCount || 0 }} />
              )}
            </Grid.Item>
            {searchPhrase && searchPhrase.length >= 3 && (
              <Grid.Item grow={0}>
                {showFilterButton && (
                  <Button onClick={filterSearch} type="plain">
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
