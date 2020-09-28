import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DisplayStepper from '../../common/DisplayStepper';
import { withCatContext } from '../../common/wrappers/CatContext';
import { useStyles } from '../../../themes/useStyles';
import { withMediaQuery } from '../../common/wrappers/MediaQuery';
import Capitalize from '../../common/Capitalize';

const mockSteps = [
  {
    imageName: 'image1',
    image:
      'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
  },
  {
    imageName: 'image2',
    image:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg',
  },
  {
    imageName: 'image3',
    image:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/reference_guide/outdoor_cat_risks_ref_guide/1800x1200_outdoor_cat_risks_ref_guide.jpg',
  },
  {
    imageName: 'image4',
    image: 'https://miro.medium.com/max/1000/1*qyAOepULOa_kVehhEIySKA.jpeg',
  },
  {
    imageName: 'image5',
    image:
      'https://i.pinimg.com/originals/66/d7/29/66d729c5a9d979b9c65e278373c564b2.jpg',
  },
];

const displayValues = {
  age: true,
  description: true,
  rows: true,
};

const calculatedCatDisplay = (selectedCat, className) => {
  return Object.keys(selectedCat)
    .filter((e) => !!displayValues[e])
    .map((attributeName) => {
      return (
        <Grid
          item
          container
          xs={12}
          md={9}
          component={Paper}
          elevation={6}
          className={className}
          key={`attribute_${attributeName}`}
        >
          <Typography component="h1" variant="h5">
            <Capitalize>{attributeName}</Capitalize>:{' '}
            {selectedCat[attributeName]}
          </Typography>
        </Grid>
      );
    });
};

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
      {calculatedCatDisplay(
        selectedCat,
        `${classes.verticalMargin} ${classes.container}`,
      )}
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
