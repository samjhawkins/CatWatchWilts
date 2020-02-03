import React from 'react';
import {makeStyles} from "@material-ui/core";
import {CardActions, Card, CardActionArea, Typography, CardContent, CardMedia, Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: '200px',
        maxWidth: '80%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

const CatCard = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={props.imageName}
                    image={props.image}
                    title={props.imageName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default CatCard;