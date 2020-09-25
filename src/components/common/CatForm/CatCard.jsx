import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardMedia,
  GridListTileBar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import { withCatContext } from '../wrappers/CatContext';
import { useStyles } from '../../../themes/useStyles';

const CatCard = ({
  setSelectedCat,
  calculateDimensions,
  id,
  index,
  imageName,
  image,
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
    history.push('/viewCat');
  };

  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            onLoad={cardCalculateDimensions}
            component="img"
            alt={imageName}
            image={image}
            title={imageName}
            onClick={setCat}
          />
        </CardActionArea>
      </Card>
      <GridListTileBar
        title={
          <Typography component="span">
            <>
              {/* eslint-disable-next-line eqeqeq */}
              {name} - {age} year{age == '1' || 's'} old
            </>
          </Typography>
        }
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
  setSelectedCat: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  calculateDimensions: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  imageName: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

CatCard.defaultProps = {
  imageName: '',
};

export default withCatContext(CatCard);
