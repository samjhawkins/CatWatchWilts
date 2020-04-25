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

const columnWidth = 4;
const direction = 'cols';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'none',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
});

class Cats extends Component {
  componentDidMount() {
    const { loadCats } = this.props;
    loadCats();
  }

  componentDidUpdate() {
    const { cats, sorted, sortCatsForGrid } = this.props;
    const allCatsDimensioned = !cats.find(
      (elem) => !Object.keys(elem).includes(direction),
    );
    if (allCatsDimensioned && !sorted) {
      sortCatsForGrid(direction, columnWidth);
    }
  }

  render() {
    const { classes, cats } = this.props;
    return (
      <Container component="main" maxWidth="xl" className={classes.root}>
        <GridList cellHeight="auto" className={classes.gridList} cols={4}>
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
    root: PropTypes.shape.isRequired,
    gridList: PropTypes.shape.isRequired,
  }).isRequired,
  loadCats: PropTypes.func.isRequired,
  sortCatsForGrid: PropTypes.func.isRequired,
};

export default withCatContext(withStyles(styles)(Cats));
