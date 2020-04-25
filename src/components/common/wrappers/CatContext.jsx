import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../axiosInstance';
import catsMock from '../../../mocks/catsMock';
import sortGrid from '../../../utils/sortGrid';

const CatContext = React.createContext();

class CatProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      sorted: false,
      cats: catsMock,
    };
  }

  setSelectedCat = (id) => {
    const { state } = this;
    this.setState({ ...state, selected: id });
  };

  loadCats = () => {
    const { state } = this;
    this.setState({ ...state, cats: catsMock });
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

  calculateDimensions = (index, img) => {
    const height = img.offsetHeight; // cols
    const width = img.offsetWidth; // rows

    // console.log('ratiosHeight', Math.ceil(height / width));
    // console.log('ratiosWidth', Math.ceil(width / height));

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

export const withCatContext = (ContextComponent) => {
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
