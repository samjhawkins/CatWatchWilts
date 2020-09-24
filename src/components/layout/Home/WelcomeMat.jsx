import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import LinkedButton from '../../common/links/LinkedButton';
import { useStyles } from '../../../themes/useStyles';

const WelcomeMat = () => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      component={Paper}
      elevation={6}
      square
      className={classes.paper}
    >
      <Grid item sm={12} lg={7}>
        <CardMedia
          component="iframe"
          className={classes.youTube}
          src="https://www.youtube.com/embed/u4fFcz2CB-A"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="Video not found!"
        />
      </Grid>
      <Grid item xs={false} lg={1} />
      <Grid item container sm={12} lg={3}>
        <Grid item>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="span">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Aliquet nec ullamcorper sit amet risus. Quisque egestas diam in
              arcu cursus euismod quis. Dictum at tempor commodo ullamcorper a
              lacus vestibulum. Sagittis nisl rhoncus mattis rhoncus. Non
              curabitur gravida arcu ac tortor dignissim. Justo nec ultrices dui
              sapien eget mi proin. Pellentesque sit amet porttitor eget dolor
              morbi. Senectus et netus et malesuada. Maecenas pharetra convallis
              posuere morbi leo urna molestie at. Pellentesque habitant morbi
              tristique senectus et netus et malesuada.
            </Typography>
          </CardContent>
        </Grid>
        <Grid item>
          <CardActions>
            <Grid item container xs={12}>
              <Grid item xs={12} sm={4} lg={12}>
                <LinkedButton
                  className={classes.button}
                  to="/cats"
                  text="Let's get looking"
                  size="large"
                  colour="primary"
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={12}>
                <LinkedButton
                  className={classes.button}
                  to="/blog"
                  text="Whats new"
                  size="large"
                  colour="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={12}>
                <LinkedButton
                  className={`${classes.tertiaryButton} ${classes.button}`}
                  to="/contact"
                  text="Contact us"
                  size="large"
                />
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
      <Grid item xs={false} lg={1} />
    </Grid>
  );
};

export default WelcomeMat;
