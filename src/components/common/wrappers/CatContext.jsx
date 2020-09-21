import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../axiosInstance';
import logger from '../../../utils/logger';
import sortGrid from '../../../utils/sortGrid';
import isPopulatedArray from '../../../utils/isPopulatedArray';
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from '../../../utils/sessionStorage';

const CatContext = React.createContext();

class CatProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCat: {},
      sorted: false,
      cats: [],
    };
  }

  componentDidMount = () => {
    const { state } = this;
    const selectedCat = getSessionStorageItem('selectedCat');
    this.setState({
      ...state,
      selectedCat,
    });
  };

  endpointError = (error) => {
    if (error.status === '1001') {
      logger('Authentication error - Logging out');
      const { logout } = this.props;
      logout();
    }
    logger(error);
  };

  setSelectedCat = (id) => {
    const { cats } = this.state;
    const { state } = this;
    const selectedCat =
      (isPopulatedArray(cats) && cats.find((cat) => cat.id === id)) || {};
    setSessionStorageItem('selectedCat', selectedCat);
    this.setState({ ...state, selectedCat });
  };

  loadCats = async () => {
    const { state } = this;
    return axios
      .get('/db/cats')
      .then((response) => {
        this.setState({ ...state, cats: response.data.data });
      })
      .catch(this.endpointError);
  };

  updateCat = async (cat) => {
    return axios
      .put('/db/cat', {
        params: {
          cat,
        },
      })
      .then((response) => response.data.data)
      .catch(this.endpointError);
  };

  calculateDimensions = (index, img) => {
    const height = img.offsetHeight; // cols
    const width = img.offsetWidth; // rows

    const { state } = this;
    const newCats = [...state.cats];
    newCats[index].rows = Math.ceil(height / width);
    newCats[index].cols = Math.ceil(width / height);

    this.setState({ ...state, cats: newCats });
  };

  sortCatsForGrid = (direction, columnWidth) => {
    const { state } = this;
    const sortedArray = sortGrid(state.cats, direction, columnWidth);
    this.setState({ ...state, cats: sortedArray, sorted: true });
  };

  render() {
    const { children } = this.props;
    return (
      <CatContext.Provider
        value={{
          calculateDimensions: this.calculateDimensions,
          setSelectedCat: this.setSelectedCat,
          loadCats: this.loadCats,
          updateCat: this.updateCat,
          sortCatsForGrid: this.sortCatsForGrid,
          ...this.state,
        }}
      >
        {children}
      </CatContext.Provider>
    );
  }
}

CatProvider.propTypes = {
  logout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const withCatContext = (ContextComponent) => {
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

export { CatProvider, CatConsumer, CatContext, withCatContext };
