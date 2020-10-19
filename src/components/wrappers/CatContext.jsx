import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router-dom';
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

const CatProviderWithoutHistory = (props) => {
  const { children } = props;
  const history = useHistory();

  const [catState, setCatState] = useState({
    selectedCat: {},
    sorted: false,
    cats: [],
  });

  const endpointError = (error) => {
    if (error.status === '1001') {
      logger('Authentication error - Logging out');
      const { logout } = props;
      logout();
    }
    logger(error);
  };
  const setSelectedCat = (id) => {
    const { cats } = catState;

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
      setCatState({ ...catState, selectedCat });
    } else {
      const selectedCat =
        (isPopulatedArray(cats) && cats.find((cat) => cat.id === id)) || {};
      setSessionStorageItem('selectedCat', selectedCat);
      setCatState({ ...catState, selectedCat });
    }
  };

  const loadCats = async (updateState = catState) => {
    if (process.env.MOCK_CATS === 'true') {
      return setCatState({
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
        setCatState({ ...updateState, cats: newCats });
      })
      .catch(endpointError);
  };
  const updateCat = async (cat) => {
    return axios
      .put(`/db/cats/${cat.id}`, cat)
      .then(() => {
        // Then navigate to the home page and refresh
        history.push('/');
        history.go(0);
      })
      .catch(endpointError);
  };
  const deleteCat = async (cat) => {
    logger('id to delete', cat);
    return axios
      .delete(`/db/cats/${cat}`, {})
      .then(() => {
        // Then navigate to the home page and refresh
        history.push('/');
        history.go(0);
      })
      .catch(endpointError);
  };

  const calculateDimensions = (catId, img) => {
    const height = img.offsetHeight; // cols
    const width = img.offsetWidth + 30; // rows

    const newCats = [...catState.cats];
    const findCat = newCats.findIndex(({ id }) => id === catId);
    try {
      newCats[findCat].rows = Math.ceil(height / width);
      newCats[findCat].cols = Math.ceil(width / height);
    } catch (e) {
      logger('Error calculatingDimensions: ', e);
    }
    setCatState({ ...catState, cats: newCats, sorted: false });
  };
  const sortCatsForGrid = (isLoggedIn) => {
    const sortedArray = sortGrid(catState.cats, isLoggedIn);
    setCatState({ ...catState, cats: sortedArray, sorted: true });
  };

  useEffect(() => {
    const selectedCat = getSessionStorageItem('selectedCat');
    loadCats({
      ...catState,
      selectedCat,
    });
  }, []);

  return (
    <CatContext.Provider
      value={{
        calculateDimensions,
        setSelectedCat,
        deleteCat,
        loadCats,
        updateCat,
        sortCatsForGrid,
        ...catState,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

CatProviderWithoutHistory.propTypes = {
  logout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const CatProvider = withRouter(CatProviderWithoutHistory);

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
