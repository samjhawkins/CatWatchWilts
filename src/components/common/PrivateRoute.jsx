import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withContext } from './wrappers/AuthContext';

class PrivateRoute extends Route {
  render() {
    if (this.props.isLoggedIn) {
      return super.render();
    }
    return <Redirect to="/login" />;
  }
}

export default withContext(PrivateRoute);
