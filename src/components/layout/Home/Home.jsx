import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  GridList,
  GridListTile,
} from '@material-ui/core/index';
import { withCatContext } from '../../common/wrappers/CatContext';
import { withMediaQuery } from '../../common/wrappers/MediaQuery';
import { useStyles } from '../../../themes/useStyles';
import isPopulatedArray from '../../../utils/isPopulatedArray';
import CatCard from '../../common/CatForm/CatCard';
import WelcomeMat from './WelcomeMat';

const Home = (props) => {
  const {
    cats,
    sortCatsForGrid,
    sorted,
    matches: { aboveSM, aboveMD },
  } = props;
  const classes = useStyles({ aboveSM });

  useEffect(() => {
    if (!sorted) {
      sortCatsForGrid();
    }
  }, [sorted]);

  const maxWidth = aboveSM ? 'xl' : undefined;

  return (
    <>
      <Container component="main" maxWidth={maxWidth} className={classes.root}>
        <WelcomeMat aboveSM={aboveSM} />
      </Container>
      <Container
        component="main"
        maxWidth={maxWidth}
        className={classes.root_cats}
      >
        <Typography component="h2">
          Meet some of our our current guests...
        </Typography>
      </Container>
      <Container component="main" maxWidth={maxWidth} className={classes.root}>
        <GridList
          cellHeight="auto"
          className={classes.fullWidth}
          cols={aboveMD ? parseInt(process.env.COLUMN_WIDTH, 0) : 1}
        >
          {isPopulatedArray(cats) &&
            cats.map((cat, index) => (
              <GridListTile
                key={`${cat.id}`}
                cols={aboveMD ? cat.cols || 1 : 1}
                rows={aboveMD ? cat.rows || 1 : 1}
              >
                <CatCard index={index} {...cat} />
              </GridListTile>
            ))}
        </GridList>
      </Container>
    </>
  );
};

Home.propTypes = {
  cats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sorted: PropTypes.bool.isRequired,
  loadCats: PropTypes.func.isRequired,
  sortCatsForGrid: PropTypes.func.isRequired,
  matches: PropTypes.shape({
    aboveSM: PropTypes.bool.isRequired,
    aboveMD: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withMediaQuery(withCatContext(Home));
