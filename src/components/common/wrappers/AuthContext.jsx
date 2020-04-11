import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!cookie.load('token'),
    };
  }

  login = async () => {
    // do a call here to get a token
    const token = 'MOCK_TOKEN_HERE';
    return cookie.save('token', token);
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
