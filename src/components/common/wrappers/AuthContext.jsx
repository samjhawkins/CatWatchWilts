import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import axios from '../axiosInstance';
import logger from '../../../utils/logger';

const redirectUri = 'https://localhost:40000';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!cookie.load('token'),
    };
  }

  componentDidMount() {
    this.login();
  }

  login = async () => {
    // do a call here to get a token
    const token = new URLSearchParams(window.location.search).get('code');

    const config = {
      headers: {
        Authorization: process.env.BASE64_SECRET,
      },
    };
    logger('process.env.64', process.env.BASE64_SECRET);

    axios
      .post(
        'https://catwatch.auth.eu-west-2.amazoncognito.com/oauth2/token',
        `code=${token}&grant_type=authorization_code&redirect_uri=${redirectUri}&client_id=${process.env.CLIENT_ID}&scope=all`,
        config,
      )
      .then((data) => {
        logger('data', data);
        cookie.save('token', data);
      })
      .catch((e) => {
        logger('Error translating:', e);
      });
  };

  logout = () => {
    cookie.save('token', '');
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { children } = this.props;
    const { isLoggedIn } = this.state;
    return (
      <AuthContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          isLoggedIn,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const withContext = (ContextComponent) => {
  return (props) => {
    return (
      <AuthContext.Consumer>
        {(globalState) => {
          return <ContextComponent {...globalState} {...props} />;
        }}
      </AuthContext.Consumer>
    );
  };
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
