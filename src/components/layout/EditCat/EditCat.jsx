import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withCatContext } from '../../common/wrappers/CatContext';
import CatForm from '../../common/CatForm/CatForm';
import getMUIDimensions from '../../../utils/getMUIDimensions';
import { useStyles } from '../../../themes/useStyles';
import { withMediaQuery } from '../../common/wrappers/MediaQuery';

const EditCat = ({ selectedCat, matches: { aboveSM } }) => {
  const classes = useStyles({ imgUrl: selectedCat.image, aboveSM });
  const breakpoints = getMUIDimensions(selectedCat.rows, selectedCat.cols);

  return (
    <Grid item container component="main" xs={10} className={classes.root}>
      <Grid item {...breakpoints.image} className={classes.image} />
      <Grid item {...breakpoints.div} component={Paper} elevation={6} square>
        <div className={classes.flex_paper}>
          <Typography component="h1" variant="h5">
            {selectedCat.name}
          </Typography>
          <CatForm mode="view" cat={selectedCat} withInitialDisplay />
        </div>
      </Grid>
    </Grid>
  );
};

EditCat.propTypes = {
  selectedCat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
  }).isRequired,
};

export default withCatContext(withMediaQuery(EditCat));
