import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FDD017',
    },
    secondary: {
      main: '#C21807',
    },
    text: {
      primary: '#4D4D4D',
      secondary: '#979797',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
