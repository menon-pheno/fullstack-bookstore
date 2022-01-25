import App from 'next/app';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.object).isRequired,
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

MyApp.propTypes = propTypes;

export default MyApp;
