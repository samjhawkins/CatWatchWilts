import React, {Component} from 'react';
import catsMock from '../../../mocks/catsMock';
import isPopulatedArray from "../../../utils/isPopulatedArray";
import {GridList, GridListTile, ListSubheader, Container} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import CatCard from "./CatCard";
import sortGrid from "../../../utils/sortGrid";

const columnWidth = 4;
const direction = 'cols';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowY: 'none',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
    }
});

export class Cats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cats: [],
            sorted: false,
        };
        this.calculateDimensions = this.calculateDimensions.bind(this);
    }

    componentDidMount() {
        this.setState({cats: catsMock})
    }

    componentDidUpdate() {
        const { cats, sorted } = this.state;                                   //element includes attribute
        const allCatsDimensioned = !cats.find((elem) => !Object.keys(elem).includes(direction));
        if(allCatsDimensioned && !sorted){
            const sortedArray = sortGrid(cats, direction, columnWidth);
            console.log('sortedArray output:', sortedArray);
            this.setState({cats: sortedArray, sorted: true});
        }
    }

    calculateDimensions(index, img) {
        const height = img.offsetHeight; //cols
        const width = img.offsetWidth; //rows

        // console.log('ratiosHeight', Math.ceil(height / width));
        // console.log('ratiosWidth', Math.ceil(width / height));

        const cats = [...this.state.cats];
        cats[index].rows = Math.ceil(height / width);
        cats[index].cols = Math.ceil(width / height);

        this.setState(cats);
    };

    render() {
        const {classes} = this.props;
        const {cats} = this.state;
        return (
            <Container component="main" maxWidth="xl" className={classes.root}>
                <GridList cellHeight={'auto'} className={classes.gridList} cols={4}>
                    <GridListTile key="Subheader" cols={columnWidth} style={{height: 'auto'}}>
                        <ListSubheader component="h2">Our current guests</ListSubheader>
                    </GridListTile>
                    {isPopulatedArray(cats) && cats.map((cat, index) => (
                        <GridListTile
                            key={`${index}-${cat.name}`}
                            cols={cat.cols || 1}
                            rows={cat.rows || 1}
                        >
                            <CatCard
                                calculateDimensions={this.calculateDimensions}
                                index={index}
                                {...cat}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Container>
        )
    }
}

export default withStyles(styles)(Cats);