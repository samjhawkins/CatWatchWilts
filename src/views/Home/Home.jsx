import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  GridList,
  GridListTile,
  Typography,
} from '@material-ui/core/index';
import { useHistory } from 'react-router-dom';
import { withCatContext } from '../../components/wrappers/CatContext';
import { withMediaQuery } from '../../components/wrappers/MediaQuery';
import { useStyles } from '../../themes/useStyles';
import isPopulatedArray from '../../utils/isPopulatedArray';
import CatCard from '../../components/CatForm/CatCard';
import WelcomeMat from './WelcomeMat';
import { withAuthContext } from '../../components/wrappers/AuthContext';

const Home = (props) => {
  const {
    setSelectedCat,
    isLoggedIn,
    cats,
    sortCatsForGrid,
    sorted,
    matches: { aboveSM, aboveMD },
  } = props;
  const classes = useStyles({ aboveSM });
  const history = useHistory();

  useEffect(() => {
    if (!sorted) {
      sortCatsForGrid(isLoggedIn);
    }
  }, [sorted]);

  useEffect(() => {
    sortCatsForGrid(isLoggedIn);
  }, [isLoggedIn]);

  const maxWidth = aboveSM ? 'xl' : undefined;
  const displayCats = isLoggedIn ? cats : cats.filter(({ active }) => active);

  // eslint-disable-next-line no-unused-vars
  const addCat = () => {
    setSelectedCat();
    history.push('/viewCat');
  };

  const viewCat = (id) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCat(id);
    history.push('/viewCat');
  };

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
                onClick={viewCat(cat.id)}
                key={`${cat.id}`}
                cols={aboveMD ? cat.cols || 1 : 1}
                rows={aboveMD ? cat.rows || 1 : 1}
                style={{ cursor: 'pointer' }}
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
  setSelectedCat: PropTypes.func.isRequired,
  sortCatsForGrid: PropTypes.func.isRequired,
  matches: PropTypes.shape({
    aboveSM: PropTypes.bool.isRequired,
    aboveMD: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withMediaQuery(withAuthContext(withCatContext(Home)));
