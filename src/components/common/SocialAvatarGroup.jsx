import React from 'react';
import SocialAvatar from "./NavBar/SocialAvatar";
import faceBook from "../../images/f_logo_White.png";
import instaGram from "../../images/i_logo_Black.png";
import twitter from "../../images/t_logo_White.png";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  appBarItem: {
    margin: theme.spacing(3),
  },
}));

const SocialAvatarGroup = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <SocialAvatar
        newWindow={true}
        href="http://fb.me/wiltsandhantscats"
        className={classes.appBarItem}
        alt="Facebook Logo"
        src={faceBook}
      />
      <SocialAvatar
        newWindow={true}
        href="https://www.instagram.com/cat_watch_wilts/"
        className={classes.appBarItem}
        alt="Instagram Logo"
        src={instaGram}
      />
      <SocialAvatar
        newWindow={true}
        href="https://twitter.com/cat_watch_wilts"
        className={classes.appBarItem}
        alt="Twitter Logo"
        src={twitter}
      />
    </React.Fragment>
  );
};

export default SocialAvatarGroup;