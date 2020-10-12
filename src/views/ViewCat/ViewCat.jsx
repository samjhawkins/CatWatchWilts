import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Grid, Paper, Typography} from '@material-ui/core';
import DisplayStepper from '../../components/DisplayStepper';
import {withCatContext} from '../../components/wrappers/CatContext';
import {useStyles} from '../../themes/useStyles';
import {withMediaQuery} from '../../components/wrappers/MediaQuery';
import ObjectMapper from '../../components/ObjectMapper';
import mockSteps from '../../mocks/mockSteps';
import CatAttributeTile from '../../components/CatForm/CatAttributeTile';

const ViewCat = ({ selectedCat, matches: { aboveSM } }) => {
  const [dimension, setDimension] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles({ aboveSM });
  const dimensionClass = dimension
    ? classes.swapDimensionsTrue
    : classes.swapDimensionsFalse;
  const catAttributeClass = `${classes.verticalMargin} ${classes.container}`;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Grid
      item
      container
      component="main"
      justify="center"
      className={classes.root}
    >
      <CatAttributeTile component={Paper} className={catAttributeClass}>
        <Typography component="h1" variant="h3">
          {selectedCat.name}
        </Typography>
      </CatAttributeTile>
      <CatAttributeTile className={classes.verticalMargin}>
        <DisplayStepper
          steps={selectedCat.imageArray || mockSteps}
          setDimension={setDimension}
          className={dimensionClass}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </CatAttributeTile>
      <ObjectMapper selectedCat={selectedCat} className={catAttributeClass} />
    </Grid>
  );
};

ViewCat.propTypes = {
  selectedCat: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.number,
    rows: PropTypes.number,
    cols: PropTypes.number,
    imageArray: PropTypes.arrayOf(
      PropTypes.shape({
        imageName: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  }).isRequired,
  matches: PropTypes.shape({
    aboveSM: PropTypes.bool.isRequired,
    aboveMD: PropTypes.bool.isRequired,
  }),
};

ViewCat.defaultProps = {
  matches: { aboveSM: false, aboveMD: false },
};

export default withCatContext(withMediaQuery(ViewCat));
