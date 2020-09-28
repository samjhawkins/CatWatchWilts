import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DisplayStepper from '../../common/DisplayStepper';
import { withCatContext } from '../../common/wrappers/CatContext';
import { useStyles } from '../../../themes/useStyles';
import { withMediaQuery } from '../../common/wrappers/MediaQuery';
import ObjectMapper from '../../common/ObjectMapper';
import mockSteps from '../../../mocks/mockSteps';

const ViewCat = ({ selectedCat, matches: { aboveSM } }) => {
  const [dimension, setDimension] = useState(false);
  const classes = useStyles({ aboveSM });
  const dimensionClass = dimension
    ? classes.swapDimensionsTrue
    : classes.swapDimensionsFalse;

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
      <Grid
        item
        container
        xs={12}
        md={9}
        component={Paper}
        elevation={6}
        className={`${classes.verticalMargin} ${classes.container}`}
      >
        <Typography component="h1" variant="h3">
          {selectedCat.name}
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={9}
        justify="center"
        className={classes.verticalMargin}
      >
        <DisplayStepper
          steps={selectedCat.imageArray || mockSteps}
          setDimension={setDimension}
          className={dimensionClass}
        />
      </Grid>
      <ObjectMapper
        selectedCat={selectedCat}
        className={`${classes.verticalMargin} ${classes.container}`}
      />
    </Grid>
  );
};

ViewCat.propTypes = {
  selectedCat: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
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
