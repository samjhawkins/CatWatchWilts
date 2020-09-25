import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withCatContext } from '../../common/wrappers/CatContext';
import CatForm from '../../common/CatForm/CatForm';
import { useStyles } from '../../../themes/useStyles';
import { withMediaQuery } from '../../common/wrappers/MediaQuery';

const EditCat = ({ selectedCat, matches: { aboveSM } }) => {
  const classes = useStyles({ imgUrl: selectedCat.image, aboveSM });
  const wider = selectedCat.cols / selectedCat.rows >= 1;

  const xsRatio = wider || !aboveSM ? 12 : 6;

  return (
    <Grid item container component="main" className={classes.root}>
      <Grid
        item
        xs={xsRatio}
        md={6}
        component="img"
        src={selectedCat.image}
        className={classes.fullWidth}
      />
      <Grid item xs={xsRatio} md={6} component={Paper} elevation={6} square>
        <Typography component="h1" variant="h5">
          {selectedCat.name}
        </Typography>
        <CatForm mode="view" cat={selectedCat} />
      </Grid>
    </Grid>
  );
};

EditCat.propTypes = {
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

EditCat.defaultProps = {
  matches: { aboveSM: false, aboveMD: false },
};

export default withCatContext(withMediaQuery(EditCat));
