import React from 'react';
import {Button} from "@material-ui/core/index";
import UndecoratedLink from "./UndecoratedLink";

const LinkedButton = ({to, text, size, colour, className}) => {
    return (
        <UndecoratedLink to={to}>
            <Button size={size} variant="contained" color={colour || undefined} className={className}>
                {text}
            </Button>
        </UndecoratedLink>
    );
}

export default LinkedButton;