import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  ListSubheader,
  Container,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import isPopulatedArray from '../../../utils/isPopulatedArray';
import CatCard from './CatCard';
import { withCatContext } from '../../common/wrappers/CatContext';
import { themedStyles } from '../../../themes/useStyles';

const columnWidth = 4;
const direction = 'cols';

class Cats extends Component {
  componentDidMount() {
    const { loadCats } = this.props;
    loadCats();
  }

  componentDidUpdate() {
    const { cats, sorted, sortCatsForGrid } = this.props;
    if (cats && cats.length) {
      const allCatsDimensioned = !cats.find(
        (elem) => !Object.keys(elem).includes(direction),
      );
      if (allCatsDimensioned && !sorted) {
        sortCatsForGrid(direction, columnWidth);
      }
    }
  }

  render() {
    const { classes, cats } = this.props;
    return (
      <Container component="main" maxWidth="xl" className={classes.root_cats}>
        <GridList cellHeight="auto" className={classes.fullWidth} cols={4}>
          <GridListTile
            key="Subheader"
            cols={columnWidth}
            style={{ height: 'auto' }}
          >
            <ListSubheader component="h2">Our current guests</ListSubheader>
          </GridListTile>
          {isPopulatedArray(cats) &&
            cats.map((cat, index) => (
              <GridListTile
                key={`${cat.id}`}
                cols={cat.cols || 1}
                rows={cat.rows || 1}
              >
                <CatCard index={index} {...cat} />
              </GridListTile>
            ))}
        </GridList>
      </Container>
    );
  }
}

Cats.propTypes = {
  cats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  sorted: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    fullWidth: PropTypes.shape.isRequired,
    root_cats: PropTypes.shape.isRequired,
  }).isRequired,
  loadCats: PropTypes.func.isRequired,
  sortCatsForGrid: PropTypes.func.isRequired,
};

export default withCatContext(withStyles(themedStyles)(Cats));
