import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardMedia,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import { withCatContext } from '../wrappers/CatContext';
import { withAuthContext } from '../wrappers/AuthContext';
import { useStyles } from '../../../themes/useStyles';
import defaultImageObject from '../../../utils/defaultImageObject';
import CatTitle from './CatTitle';

const CatCard = ({
  setSelectedCat,
  calculateDimensions,
  isLoggedIn,
  id,
  index,
  image,
  imageArray,
  name,
  age,
}) => {
  const { icon } = useStyles();
  const history = useHistory();
  const cardCalculateDimensions = ({ target }) => {
    calculateDimensions(index, target);
  };

  const setCat = () => {
    setSelectedCat(id);
    history.push(isLoggedIn ? '/editCat' : '/viewCat');
  };

  const mainStep = imageArray[image] || defaultImageObject;

  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            onLoad={cardCalculateDimensions}
            component="img"
            alt={mainStep.imageName}
            image={mainStep.image}
            title={mainStep.imageName}
            onClick={setCat}
          />
        </CardActionArea>
      </Card>
      <GridListTileBar
        style={{ cursor: 'pointer' }}
        onClick={setCat}
        title={<CatTitle name={name} age={age} setCat={setCat} />}
        actionIcon={
          <IconButton aria-label={`info about ${name}`} className={icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </>
  );
};

CatCard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setSelectedCat: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  calculateDimensions: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  imageArray: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      imageName: PropTypes.string,
    }),
  ),
};

CatCard.defaultProps = {
  imageArray: [],
};

export default withAuthContext(withCatContext(CatCard));
