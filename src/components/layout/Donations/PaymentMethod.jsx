import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(6),
        width: theme.spacing(150),
        height: theme.spacing(40),
    },
    topMargin: {
        paddingTop: theme.spacing(10),
    }
}));

const PaymentMethod = ({name, button, logo}) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid item xs={12} className={classes.topMargin}>
                <Typography component="h4" variant="h4">
                    {name}
                </Typography>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={12} sm={8} md={12} lg={9}>
                    <Avatar
                        alt={`${name} logo`}
                        src={logo}
                        variant="rounded"
                        className={classes.avatar}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={12} lg={3}>
                    {button}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default PaymentMethod;