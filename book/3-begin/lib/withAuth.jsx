import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

const globalUser = null;

export default function withAuth(
  BaseComponent,
  { loginRequired = true, logoutRequired = false } = {},
) {
  const propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      isAdmin: PropTypes.bool,
    }),
    isFromServer: PropTypes.bool.isRequired,
  };

  const defaultProps = {
    user: null,
  };

  class App extends React.Component {
    static async getInitialProps(ctx) {
      // 1. getInitialProps
    }

    componentDidMount() {
      // 2. componentDidMount
    }

    render() {
      // 3. render

      return (
        <>
          <BaseComponent {...this.props} />
        </>
      );
    }
  }

  App.propTypes = propTypes;
  App.defaultProps = defaultProps;

  return App;
}
