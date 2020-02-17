import React from 'react';
import {Button} from "@material-ui/core/index";
import UndecoratedLink from "./UndecoratedLink";

const LinkedButton = ({to, text, size, colour, className, variant}) => {
    return (
        <UndecoratedLink to={to}>
            <Button size={size} variant={variant} color={colour || undefined} className={className}>
                {text}
            </Button>
        </UndecoratedLink>
    );
};
LinkedButton.defaultProps = {
  variant: 'contained'
};

export default LinkedButton;