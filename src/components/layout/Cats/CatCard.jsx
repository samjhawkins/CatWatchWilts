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
import LinkedButton from '../../common/links/LinkedButton';
import { withCatContext } from '../../common/wrappers/CatContext';
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
