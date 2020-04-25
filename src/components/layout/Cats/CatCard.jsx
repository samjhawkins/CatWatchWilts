import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { makeStyles } from '@material-ui/styles';
import LinkedButton from '../../common/links/LinkedButton';
import { withCatContext } from '../../common/wrappers/CatContext';

const useStyles = makeStyles(() => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

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
  const cardCalculateDimensions = ({ target }) => {
    calculateDimensions(index, target);
  };

  const setCat = () => {
    setSelectedCat(id);
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
          />
        </CardActionArea>
      </Card>
      <GridListTileBar
        title={
          <span>
            {name} - {age} year{age === '1' || 's'} old
          </span>
        }
        subtitle={
          <>
            <Button size="small" color="secondary">
              Share
            </Button>
            <LinkedButton
              onClick={setCat}
              to="viewCat"
              size="small"
              color="secondary"
              text="Learn More"
            />
          </>
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
  id: PropTypes.number.isRequired,
  calculateDimensions: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  imageName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
};

export default withCatContext(CatCard);
