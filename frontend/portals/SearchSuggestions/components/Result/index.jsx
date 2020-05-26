import React, { useContext, useCallback } from 'react';
import { css } from 'glamor';
import {
  getCurrentRouteHelper, useTheme, RouteContext, ITEMS_PER_LOAD, UIEvents,
} from '@shopgate/engage/core';
import { ViewContext } from '@shopgate/engage/components/View';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { ResultContext } from '../Provider/context';

const styles = {
  products: css({
    marginTop: themeConfig.variables.gap.small,
  }),
};

/**
 * @returns {JSX}
 */
const SearchSuggestionsResult = () => {
  const { ProductGrid } = useTheme();
  const {
    totalProductCount, products, hash, contentRef, getProducts,
  } = useContext(ResultContext);

  const productClick = useCallback(() => {
    // Default GMD theme search bar toggle
    UIEvents.emit('TOGGLE_SEARCH', false);
  }, []);

  return (
    <div aria-hidden className={styles.products} onClick={productClick}>
      <ViewContext.Consumer>
        {viewContext => (
          <ViewContext.Provider
            value={{
              ...viewContext,
              getContentRef: () => contentRef,
            }}
          >
            <RouteContext.Provider value={getCurrentRouteHelper() || {}}>
              <ProductGrid
                handleGetProducts={getProducts}
                products={products}
                totalProductCount={totalProductCount}
                requestHash={hash}
                infiniteLoad={totalProductCount ? totalProductCount > ITEMS_PER_LOAD : true}
              />
            </RouteContext.Provider>
          </ViewContext.Provider>
        )}
      </ViewContext.Consumer>
    </div>
  );
};

export default SearchSuggestionsResult;
