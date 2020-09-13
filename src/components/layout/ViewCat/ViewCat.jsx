import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withCatContext } from '../../common/wrappers/CatContext';
import CatForm from '../../common/CatForm/CatForm';
import getMUIDimensions from '../../../utils/getMUIDimensions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    height: '94vh',
  },
  image: {
    backgroundImage: (props) => `url(${props.selectedCat.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: '50% 25%',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ViewCat = ({ selectedCat }) => {
  console.log('selectedViewCat', selectedCat);
  const classes = useStyles({ selectedCat });
  const breakpoints = getMUIDimensions(selectedCat.rows, selectedCat.cols);

  return (
    <Grid item container component="main" xs={10} className={classes.root}>
      <Grid item {...breakpoints.image} className={classes.image} />
      <Grid item {...breakpoints.div} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {selectedCat.name}
          </Typography>
          <CatForm mode="view" cat={selectedCat} withInitialDisplay />
        </div>
      </Grid>
    </Grid>
  );
};

ViewCat.propTypes = {
  selectedCat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
  }).isRequired,
};

export default withCatContext(ViewCat);
