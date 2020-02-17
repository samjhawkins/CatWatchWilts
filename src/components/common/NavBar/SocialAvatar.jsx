import React from 'react';
import Avatar from "@material-ui/core/Avatar";

const SocialAvatar = ({href, alt, src, className, newWindow}) => {
    return (
        <a
            target={newWindow ? "_blank" : undefined}
            href={href}
            className={className}
        >
            <Avatar
                alt={alt}
                src={src}
                variant="rounded"
            />
        </a>
    );
};

export default SocialAvatar;