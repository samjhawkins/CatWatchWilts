import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles/index";

const useStyles = makeStyles(theme => ({
        link: {
            textDecoration: "none",
        }
    }
));

export const UndecoratedLink = ({to, href, className, children}) => {
    const classes = useStyles();
    return (
        <Link to={to} href={href} className={`${classes.link} ${className}`}>
            {children}
        </Link>
    )

};

export default UndecoratedLink;