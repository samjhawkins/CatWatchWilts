import React, {Component} from 'react';
import catsMock from '../../../mocks/catsMock';
import isPopulatedArray from "../../../utils/isPopulatedArray";
import CatCard from "./CatCard";
import {Container} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
    },
});

export class Cats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cats: []
        };
    }

    componentDidMount() {
        this.setState({cats: catsMock})
    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="md" className={classes.container}>
                {isPopulatedArray(this.state.cats) && this.state.cats.map((cat, index) =>
                    <CatCard key={index} {...cat}/>
                )}
            </Container>
        )
    }
}

export default withStyles(styles)(Cats);