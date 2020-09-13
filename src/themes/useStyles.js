import { makeStyles } from '@material-ui/styles';

const themedStyles = (theme) => ({
  // Layout
  root: {
    minHeight: '90vh',
    maxWidth: '80vw',
    margin: theme.spacing(16),
  },
  root_viewCat: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    height: '94vh',
  },
  root_cats: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'none',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(8),
  },
  flex_paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topMargin: {
    paddingTop: theme.spacing(8),
  },
  container: {
    padding: theme.spacing(3),
  },
  appBarItem: {
    margin: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fullWidth: {
    width: '100%',
  },

  // Media
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
  image: {
    backgroundImage: (props) => `url(${props.imgUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: '50% 25%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },

  // Actions
  tertiaryButton: {
    backgroundColor: theme.color.tertiary.main,
    '&:hover': {
      backgroundColor: theme.color.tertiary.dark,
    },
  },
  secondaryButton: {
    backgroundColor: theme.color.white,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  donateButton: {
    height: theme.spacing(30),
    fontWeight: 'bold',
    backgroundColor: theme.color.white,
    '&:hover': {
      backgroundColor: theme.color.tertiary.main,
    },
  },
  button: {
    fontSize: theme.spacing(5),
  },

  // Markup
  link: {
    textDecoration: 'none',
  },
  smallText: {
    fontSize: '0.7em',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
});

const useStyles = makeStyles(themedStyles);

export { useStyles, themedStyles };
