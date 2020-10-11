import { makeStyles } from '@material-ui/styles';

const themedStyles = (theme) => ({
  // Layout
  root: {
    maxWidth: (props) => (props.aboveSM ? '80vw' : ''),
    margin: (props) => (props.aboveSM ? theme.spacing(16) : ''),
    marginTop: theme.spacing(16),
    marginBottom: theme.spacing(16),
  },
  cat_tiles: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'none',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(8),
  },
  footer: {
    alignItems: 'center',
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(20),
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
  minHeight: {
    minHeight: '90vh',
  },
  verticalMargin: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  swapDimensionsTrue: {
    margin: 'auto',
    maxWidth: '50%',
  },
  swapDimensionsFalse: {
    margin: 'auto',
    maxWidth: '100%',
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
    backgroundSize: (props) => props.backgroundSize || 'cover',
    backgroundPosition: '50% 25%',
  },
  imageWidth: {
    width: (props) => `${props.imageWidth}%`,
  },
  imageHeight: {
    height: (props) => `${props.imageHeight}vw`,
  },
  fitHeight: {
    height: 'fit-content',
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
  warning: {
    color: theme.status.warning,
    fontWeight: 'bold',
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
    margin: theme.spacing(2),
    minWidth: '8.5rem',
    width: (props) => (props.aboveSM ? undefined : '90%'),
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
