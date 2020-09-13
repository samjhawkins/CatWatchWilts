import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../axiosInstance';
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

  setSelectedCat = (id) => {
    const { cats } = this.state;
    const prevState = this.state;
    const selectedCat =
      (isPopulatedArray(cats) && cats.find((cat) => cat.id === id)) || {};
    setSessionStorageItem('selectedCat', selectedCat);
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ ...prevState, selectedCat });
  };

  loadCats = async () => {
    const { state } = this;
    return axios
      .get('/cats')
      .then((response) => {
        this.setState({ ...state, cats: response.data.data });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  updateCat = async(cat) => {
    return axios
      .put('/cat', {
        params: {
          cat,
        },
      })
      .then((response) => response.data.data)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
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

export { CatProvider, CatConsumer, CatContext };
