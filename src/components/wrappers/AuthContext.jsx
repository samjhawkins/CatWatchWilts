import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getSessionStorageItem,
  removeSessionStorage,
  setSessionStorageItem,
} from '../../utils/sessionStorage';
import axios from '../../utils/axiosInstance';
import logger from '../../utils/logger';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!getSessionStorageItem('token'),
    };
  }

  componentDidMount() {
    this.login();
  }

  login = async () => {
    logger('login happened!');
    const code = new URLSearchParams(window.location.search).get('code');
    const token = getSessionStorageItem('token');

    if (!code || token) {
      this.setState({
        isLoggedIn: !!token,
      });
      return;
    }

    axios
      .get(`${process.env.BACKEND_BASE_API}/token`, {
        params: {
          code,
        },
      })
      .then((data) => {
        setSessionStorageItem('token', data.data.token);
        this.setState({ isLoggedIn: true });
      })
      .catch((e) => {
        logger('Error translating:', e);
        this.setState({ isLoggedIn: false });
      });
  };

  logout = () => {
    removeSessionStorage('token');
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

const withAuthContext = (ContextComponent) => {
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

export { AuthProvider, AuthConsumer, AuthContext, withAuthContext };
