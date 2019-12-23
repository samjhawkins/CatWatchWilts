import React from 'react';
import {Tabs, Tab} from "@material-ui/core/index";
import UndecoratedLink from "../links/UndecoratedLink";
import {makeStyles} from '@material-ui/styles/index';
import {pageList} from '../../../routes/routes.config';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    menuItem: {
        backgroundColor: theme.color.white,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    smallText: {
        fontSize: '0.7em',
    }
}));

const MainMenu = props => {
    console.log('props',props.matches?.aboveSM );
    const classes = useStyles();
    const currentTab = pageList.findIndex(route => route.path === props.location?.pathname);
    const smallTextClass = props.matches?.aboveSM ? undefined : classes.smallText;
    return (
        <Tabs
            value={currentTab > -1 ? currentTab : 0}
            indicatorColor="secondary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            className={props.className}
        >
            {pageList.map((route, index) => (
                <UndecoratedLink key={index} to={route.path}>
                    <Tab
                        value={index}
                        color={route.color}
                        label={route.name}
                        selected={currentTab === index}
                        className={
                            `${classes.menuItem} ${smallTextClass}`}

                    />
                </UndecoratedLink>
            ))}
        </Tabs>
    );
};

export default withRouter(MainMenu);