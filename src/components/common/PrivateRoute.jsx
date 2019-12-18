import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {withContext} from './wrappers/AuthContext'

class PrivateRoute extends Route {
  render(){
    console.log('loggedIn', this.props.isLoggedIn);
    if(this.props.isLoggedIn){
      return super.render();
    }
    return <Redirect to="/login" />;
  }
}

export default withContext(PrivateRoute)