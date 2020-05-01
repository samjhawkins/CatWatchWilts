import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

const SocialAvatar = ({ href, alt, src, className, newWindow }) => {
  return (
    <a
      target={newWindow ? '_blank' : undefined}
      href={href}
      className={className}
    >
      <Avatar alt={alt} src={src} variant="rounded" />
    </a>
  );
};

SocialAvatar.propTypes = {
  href: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  newWindow: PropTypes.bool,
};

SocialAvatar.defaultProps = {
  newWindow: false,
  className: '',
};

export default SocialAvatar;
