import {createMuiTheme} from '@material-ui/core/styles';
import {orange, teal, deepPurple} from '@material-ui/core/colors';

const PRIMARY_COLOR = deepPurple;

const theme = createMuiTheme({
    spacing: 2,
    status: {
        danger: orange[500],
    },
    color: {
        white: '#fafafa',
        black: '#000000'
    },
    palette: {
        primary: {
            light: PRIMARY_COLOR[300],
            main: PRIMARY_COLOR[500],
            dark: PRIMARY_COLOR[700],
        },
    },
});

export default theme;