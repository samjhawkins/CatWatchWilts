import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosInstance';
import alterCats from '../../utils/alterCats';
import logger from '../../utils/logger';
import sortGrid from '../../utils/sortGrid';
import isPopulatedArray from '../../utils/isPopulatedArray';
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from '../../utils/sessionStorage';
import catsMock from '../../mocks/catsMock';
import newIdGenerator from '../../utils/newIdGenerator';

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
    this.loadCats({
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
    if (id === 'new') {
      const imageId = newIdGenerator();
      const selectedCat = {
        active: 'false',
        id: newIdGenerator(),
        name: 'Cat Name',
        age: '0',
        image: imageId,
        description:
          'Add your description of the new cat here, you can put anything that you want',
        imageArray: [
          {
            imageId,
            imageName: 'Image Name',
            image: 'https://via.placeholder.com/500',
          },
        ],
      };
      setSessionStorageItem('selectedCat', selectedCat);
      this.setState({ ...state, selectedCat });
    } else {
      const selectedCat =
        (isPopulatedArray(cats) && cats.find((cat) => cat.id === id)) || {};
      setSessionStorageItem('selectedCat', selectedCat);
      this.setState({ ...state, selectedCat });
    }
  };

  loadCats = async (updateState = this.state) => {
    if (process.env.MOCK_CATS === 'true') {
      return this.setState({
        ...updateState,
        cats: alterCats(catsMock),
      });
    }
    return axios
      .get('/db/cats')
      .then((response) => {
        let newCats = response.data.data;
        if (newCats) {
          newCats = alterCats(newCats);
        }
        this.setState({ ...updateState, cats: newCats });
      })
      .catch(this.endpointError);
  };

  updateCat = async (cat) => {
    return axios
      .put('/db/cats', {
        params: {
          cat,
        },
      })
      .then((response) => response.data.data)
      .catch(this.endpointError);
  };

  deleteCat = async (cat) => {
    logger('id to delete', cat);
    // return axios
    //     .delete('/db/cats', {
    //       params: {
    //         cat,
    //       },
    //     })
    //     .then((response) => response.data.data)
    //     .catch(this.endpointError);
  };

  calculateDimensions = (catId, img) => {
    const height = img.offsetHeight; // cols
    const width = img.offsetWidth + 30; // rows

    const { state } = this;
    const newCats = [...state.cats];
    const findCat = newCats.findIndex(({ id }) => id === catId);
    try {
      newCats[findCat].rows = Math.ceil(height / width);
      newCats[findCat].cols = Math.ceil(width / height);
    } catch (e) {
      logger('Error calculatingDimensions: ', e);
    }
    this.setState({ ...state, cats: newCats, sorted: false });
  };

  sortCatsForGrid = (isLoggedIn) => {
    const { state } = this;
    const sortedArray = sortGrid(state.cats, isLoggedIn);
    this.setState({ ...state, cats: sortedArray, sorted: true });
  };

  render() {
    const { children } = this.props;
    return (
      <CatContext.Provider
        value={{
          calculateDimensions: this.calculateDimensions,
          setSelectedCat: this.setSelectedCat,
          deleteCat: this.deleteCat,
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
