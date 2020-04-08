import React, { Component } from 'react';
import axios from '../axiosInstance.js';

const CatContext = React.createContext();

class CatProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      age: 0,
      description: '',
      locationFound: '',
      image: '',
      imageName: '',
    };
  }

  loadCat(id) {
    return axios
      .get('OURBACKENDPOINT/cat', {
        params: {
          id,
        },
      })
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  updateCat() {
    return axios
      .put('OURBACKENDPOINT/cat', {
        params: {
          ...this.state,
        },
      })
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { children } = this.props;
    return (
      <CatContext.Provider
        value={{
          loadCat: this.loadCat,
          updateCat: this.updateCat,
          ...this.state,
        }}
      >
        {children}
      </CatContext.Provider>
    );
  }
}

export const withContext = (Component) => {
  return (props) => {
    return (
      <CatContext.Consumer>
        {(globalState) => {
          return <Component {...globalState} {...props} />;
        }}
      </CatContext.Consumer>
    );
  };
};

const CatConsumer = CatContext.Consumer;

export { CatProvider, CatConsumer, CatContext };
