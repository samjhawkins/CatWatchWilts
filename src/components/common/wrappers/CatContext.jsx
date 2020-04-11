import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../axiosInstance';

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

  loadCat = (id) => {
    return axios
      .get('OURBACKENDPOINT/cat', {
        params: {
          id,
        },
      })
      .then((response) => response.data.data)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  updateCat = () => {
    return axios
      .put('OURBACKENDPOINT/cat', {
        params: {
          ...this.state,
        },
      })
      .then((response) => response.data.data)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

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

CatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const withContext = (ContextComponent) => {
  return (props) => {
    return (
      <CatContext.Consumer>
        {(globalState) => {
          return <ContextComponent {...globalState} {...props} />;
        }}
      </CatContext.Consumer>
    );
  };
};

const CatConsumer = CatContext.Consumer;

export { CatProvider, CatConsumer, CatContext };
