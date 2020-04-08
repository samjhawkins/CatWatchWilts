import React, { useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const CatCard = (props) => {
  const classes = useStyles();
  const calculateDimensions = ({ target }) => {
    props.calculateDimensions(props.index, target);
  };

  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            onLoad={calculateDimensions}
            component="img"
            alt={props.imageName}
            image={props.image}
            title={props.imageName}
          />
        </CardActionArea>
      </Card>
      <GridListTileBar
        title={
          <span>
            {props.name} - {props.age} year{props.age === '1' || 's'} old
          </span>
        }
        subtitle={
          <>
            <Button size="small" color="secondary">
              Share
            </Button>
            <LinkedButton to="viewCat" size="small" color="secondary">
              Learn More
            </LinkedButton>
          </>
        }
        actionIcon={
          <IconButton
            aria-label={`info about ${props.name}`}
            className={classes.icon}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </>
  );
};

export default CatCard;
