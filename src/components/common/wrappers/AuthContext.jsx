import React, { Component } from 'react';
// import cookie from 'react-cookies';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  // componentDidMount() {
  //
  // }
  //
  // componentWillUnmount() {
  //
  // }
  //
  // setStateFromToken = () => {
  // };
  //
  // getTokenCookie = () => {
  //   return cookie.load('token');
  // };
  //
  // setTokenCookie = token => {
  //   cookie.save('token', token);
  // };
  //
  // resetTokenCookie = () => {
  //   cookie.remove('token');
  // };
  //
  // registration = async userInfo => {
  // };
  //
  // login = async credentials => {
  // };
  //
  // logout = () => {
  // };

  render() {
    const { children } = this.props;
    const { isLoggedIn } = this.state;
    return (
      <AuthContext.Provider
        value={{
          // login: this.login,
          // registration: this.registration,
          // logout: this.logout,
          isLoggedIn,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export const withContext = Component => {
  return props => {
    return (
      <AuthContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AuthContext.Consumer>
    );
  };
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
