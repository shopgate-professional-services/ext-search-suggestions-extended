import React, { useContext, useCallback, useMemo } from 'react';
import {
  getCurrentRouteHelper, RouteContext, ITEMS_PER_LOAD, UIEvents,
} from '@shopgate/engage/core';
import { ProductGrid } from '@shopgate/engage/product/components';
import { ViewContext } from '@shopgate/engage/components/View';
import { makeStyles } from '@shopgate/engage/styles';
import { ResultContext } from '../Provider/context';

const useStyles = makeStyles()(() => ({
  products: {
    '&& [data-test-id="productGrid"]': {
      marginTop: 0,
      paddingTop: 16,
    },
  },
}));

/**
 * @returns {JSX.Element}
 */
const SearchSuggestionsResult = () => {
  const { classes } = useStyles();
  const {
    totalProductCount, products, hash, contentRef, getProducts,
  } = useContext(ResultContext);
  const viewContext = useContext(ViewContext);

  const productClick = useCallback(() => {
    // Default GMD theme search bar toggle
    UIEvents.emit('TOGGLE_SEARCH', false);
  }, []);

  const viewContextValue = useMemo(() => ({
    ...viewContext,
    getContentRef: () => contentRef,
  }), [viewContext, contentRef]);

  const routeContextValue = useMemo(() => getCurrentRouteHelper() || {}, []);

  return (
    <div role="presentation" className={classes.products} onClick={productClick} tabIndex={-1}>
      <ViewContext.Provider value={viewContextValue}>
        <RouteContext.Provider value={routeContextValue}>
          <ProductGrid
            handleGetProducts={getProducts}
            products={products}
            totalProductCount={totalProductCount}
            requestHash={hash}
            infiniteLoad={totalProductCount ? totalProductCount > ITEMS_PER_LOAD : true}
          />
        </RouteContext.Provider>
      </ViewContext.Provider>
    </div>
  );
};

export default SearchSuggestionsResult;
