import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Container, GridList, GridListTile, Typography,} from '@material-ui/core/index';
import {withCatContext} from '../../components/common/wrappers/CatContext';
import {withMediaQuery} from '../../components/common/wrappers/MediaQuery';
import {useStyles} from '../../themes/useStyles';
import isPopulatedArray from '../../utils/isPopulatedArray';
import CatCard from '../../components/common/CatForm/CatCard';
import WelcomeMat from './WelcomeMat';
import {withAuthContext} from '../../components/common/wrappers/AuthContext';

const Home = (props) => {
  const {
    isLoggedIn,
    cats,
    sortCatsForGrid,
    sorted,
    matches: {aboveSM, aboveMD},
  } = props;
  const classes = useStyles({ aboveSM });

  useEffect(() => {
    if (!sorted) {
      sortCatsForGrid(isLoggedIn);
    }
  }, [sorted, isLoggedIn]);

  const maxWidth = aboveSM ? 'xl' : undefined;
  const displayCats = isLoggedIn ? cats : cats.filter(({ active }) => active);

  return (
    <>
      <Container component="main" maxWidth={maxWidth} className={classes.root}>
        <WelcomeMat aboveSM={aboveSM} />
      </Container>
      <Container
        component="main"
        maxWidth={maxWidth}
        className={classes.cat_tiles}
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
          {isPopulatedArray(displayCats) &&
            displayCats.map((cat, index) => (
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
  isLoggedIn: PropTypes.bool.isRequired,
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

export default withMediaQuery(withAuthContext(withCatContext(Home)));
