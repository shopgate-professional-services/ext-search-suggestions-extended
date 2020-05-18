import React, { useContext } from 'react';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';
import {
  Button, Grid, I18n, PlaceholderParagraph,
} from '@shopgate/engage/components';
import { ResultContext } from '../../context';
import Highlights from '../Highlights';

const styles = {
  wrapper: css({
    padding: `${themeConfig.variables.gap.small}px ${themeConfig.variables.gap.big}px`,
    paddingTop: themeConfig.variables.gap.small,
    background: themeConfig.colors.background,
    position: 'sticky',
    top: 0,
    zIndex: 4,
  }).toString(),
  header: css({
    textTransform: 'uppercase',
    fontWeight: 500,
  }).toString(),
};

/**
 * @returns {JSX}
 */
const SearchSuggestionsHeader = () => {
  const {
    totalProductCount, isFetching, filterSearch, searchPhrase,
  } = useContext(ResultContext);

  return (
    <div className={styles.wrapper}>
      <PlaceholderParagraph ready={!isFetching}>
        <Grid className={styles.header}>
          <Grid.Item grow={1}>
            <I18n.Text string="sp.sse.search.resultCount" params={{ count: totalProductCount || 0 }} />
          </Grid.Item>
          {searchPhrase && searchPhrase.length >= 3 && (
            <Grid.Item grow={0}>
              <Button onClick={filterSearch} type="plain">
                <I18n.Text string="titles.filter" />
              </Button>
            </Grid.Item>
          )}
        </Grid>
        <Highlights />
      </PlaceholderParagraph>
    </div>
  );
};

export default SearchSuggestionsHeader;
