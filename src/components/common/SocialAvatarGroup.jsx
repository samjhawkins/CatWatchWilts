import React from 'react';
import { makeStyles } from '@material-ui/styles';
import SocialAvatar from './NavBar/SocialAvatar';
import faceBook from '../../images/f_logo_White.png';
import instaGram from '../../images/i_logo_Black.png';
import twitter from '../../images/t_logo_White.png';

const useStyles = makeStyles((theme) => ({
  appBarItem: {
    margin: theme.spacing(3),
  },
}));

const SocialAvatarGroup = () => {
  const classes = useStyles();
  return (
    <>
      <SocialAvatar
        newWindow
        href="http://fb.me/wiltsandhantscats"
        className={classes.appBarItem}
        alt="Facebook Logo"
        src={faceBook}
      />
      <SocialAvatar
        newWindow
        href="https://www.instagram.com/cat_watch_wilts/"
        className={classes.appBarItem}
        alt="Instagram Logo"
        src={instaGram}
      />
      <SocialAvatar
        newWindow
        href="https://twitter.com/cat_watch_wilts"
        className={classes.appBarItem}
        alt="Twitter Logo"
        src={twitter}
      />
    </>
  );
};

export default SocialAvatarGroup;
