import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh',
    maxWidth: '80vw',
    margin: theme.spacing(16),
  },
  paper: {
    padding: theme.spacing(8),
  },
  youTube: {
    margin: 'auto',
    width: '90%',
    height: '54vw',
    maxWidth: '800px',
    maxHeight: '450px',
    media: {
      width: '100%',
      height: 'auto',
    },
  },
  tertiaryButton: {
    backgroundColor: theme.color.tertiary.main,
    '&:hover': {
      backgroundColor: theme.color.tertiary.dark,
    },
  },
  button: {
    fontSize: theme.spacing(5),
  },
  avatar_small: {
    margin: theme.spacing(3),
    width: theme.spacing(60),
    height: theme.spacing(30),
  },
  avatar_large: {
    margin: theme.spacing(6),
    width: theme.spacing(100),
    height: theme.spacing(25),
  },

  topMargin: {
    paddingTop: theme.spacing(8),
  },
  container: {
    padding: theme.spacing(3),
  },
}));

export default useStyles;
