import { createMuiTheme } from '@material-ui/core/styles';
import { purple, deepPurple, red } from '@material-ui/core/colors';

const PRIMARY_COLOR = deepPurple;
const SECONDARY_COLOR = purple;

const theme = createMuiTheme({
  spacing: 2,
  status: {
    warning: red[800],
  },
  color: {
    white: '#fafafa',
    black: '#000000',
    danger: {
      light: red[100],
      main: red[300],
      dark: red[900],
    },
    tertiary: {
      light: SECONDARY_COLOR[100],
      main: SECONDARY_COLOR[300],
      dark: SECONDARY_COLOR[500],
    },
  },
  palette: {
    primary: {
      light: PRIMARY_COLOR[300],
      main: PRIMARY_COLOR[500],
      dark: PRIMARY_COLOR[700],
    },
    secondary: {
      light: SECONDARY_COLOR[300],
      main: SECONDARY_COLOR[500],
      dark: SECONDARY_COLOR[700],
    },
  },
});

export default theme;
