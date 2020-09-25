import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withCatContext } from '../../common/wrappers/CatContext';
import { useStyles } from '../../../themes/useStyles';
import { withMediaQuery } from '../../common/wrappers/MediaQuery';

const ViewCat = ({ selectedCat, matches: { aboveSM } }) => {
  const classes = useStyles({ imgUrl: selectedCat.image, aboveSM });
  const wider = selectedCat.cols / selectedCat.rows >= 1;

  const xsRatio = wider || !aboveSM ? 12 : 6;

  return (
    <Grid
      item
      container
      component="main"
      className={classes.root}
    >
      <Grid
        item
        xs={xsRatio}
        md={6}
        component="img"
        src={selectedCat.image}
        className={`${classes.fullWidth} ${classes.maxHeight}`}
      />
      <Grid
        item
        xs={xsRatio}
        md={6}
        component={Paper}
        elevation={6}
        square
        className={classes.maxHeight}
      >
        <Typography component="h1" variant="h5">
          {selectedCat.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

ViewCat.propTypes = {
  selectedCat: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number,
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
