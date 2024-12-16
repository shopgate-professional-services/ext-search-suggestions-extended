import React, { useContext, useCallback } from 'react';
import { css } from 'glamor';
import {
  getCurrentRouteHelper, useTheme, RouteContext, ITEMS_PER_LOAD, UIEvents,
} from '@shopgate/engage/core';
import { ViewContext } from '@shopgate/engage/components/View';
import { ResultContext } from '../Provider/context';

const styles = {
  products: css({
    '&& [data-test-id="productGrid"]': {
      marginTop: 0,
      paddingTop: 16,
    },
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
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div className={styles.products} onClick={productClick}>
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
