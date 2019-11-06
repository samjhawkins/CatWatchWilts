import React from 'react';
import {MenuList, MenuItem, Typography} from "@material-ui/core/index";
import UndecoratedLink from "../links/UndecoratedLink";
import {makeStyles} from '@material-ui/styles/index';
import {pageList} from '../../../routes/routes.config';

const useStyles = makeStyles(theme => ({
    item: {
        backgroundColor: theme.color.white,
        justifyContent: 'center',
    }
}));

export const MainMenu = (props) => {
    const classes = useStyles();
    return (
        <MenuList>
            {pageList.map( route =>(
                <UndecoratedLink key={route.name} to={route.path}>
                    <MenuItem onClick={props.handleClose} className={classes.item}>
                        <Typography color={route.color}>
                            {route.name}
                        </Typography>
                    </MenuItem>
                </UndecoratedLink>
            ))}
        </MenuList>
    );
};

export default MainMenu;