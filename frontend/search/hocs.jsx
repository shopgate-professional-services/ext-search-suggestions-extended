import React from 'react';
import { connect } from 'react-redux';

import { getSearchPhrase } from './selectors';

/**
 * @param {Object} state .
 * @return {Object}
 */
const mapStateToProps = state => ({
  searchPhrase: getSearchPhrase(state),
});

/**
 * @param {Function} Component .
 * @returns {*}
 */
export const withSearchPhrase = Component => (props) => {
  // eslint-disable-next-line react/prop-types
  if (props.searchPhrase !== undefined) {
    return (<Component {...props} />);
  }
  const Connected = connect(mapStateToProps)(Component);
  return (<Connected {...props} />);
};
