import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardMedia,
  GridListTileBar,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { withCatContext } from '../wrappers/CatContext';
import { withAuthContext } from '../wrappers/AuthContext';
import { useStyles } from '../../themes/useStyles';
import defaultImageObject from '../../utils/defaultImageObject';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const CatCard = ({
  isLoggedIn,
  setSelectedCat,
  deleteCat,
  calculateDimensions,
  id,
  image,
  imageArray,
  name,
  age,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const cardCalculateDimensions = ({ target }) => {
    calculateDimensions(id, target);
  };

  const editCat = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCat(id);
    history.push('/editCat');
  };

  const deleteSelectedCat = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteCat(id);
  };

  const mainStep =
    imageArray.find((eachImage) => eachImage.imageId === image) ||
    defaultImageObject;
  const pluralYears = age && age.toString() === '1' ? '' : 's';
  const catTitle = `${name} - ${age} year${pluralYears} old`;

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
          />
        </CardActionArea>
      </Card>
      <GridListTileBar
        title={catTitle}
        subtitle={
          <>
            {isLoggedIn && (
              <>
                <EditButton
                  className={classes.appBarItem}
                  onClick={editCat}
                  to="editCat"
                  size="small"
                  color="secondary"
                  noLabel
                />
                <DeleteButton
                  size="small"
                  onClick={deleteSelectedCat}
                  className={`${classes.redButton} ${classes.appBarItem}`}
                  noLabel
                />
              </>
            )}
          </>
        }
      />
    </>
  );
};

CatCard.propTypes = {
  setSelectedCat: PropTypes.func.isRequired,
  deleteCat: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  calculateDimensions: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
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
