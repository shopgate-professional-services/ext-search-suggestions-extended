import { createContext } from 'react';

export const ResultContext = createContext({
  contentRef: null,
  searchPhrase: null,
  totalProductCount: null,
  products: null,
  suggestions: null,
  hash: null,
  getProducts: () => {},
  filterSearch: () => {},
});
