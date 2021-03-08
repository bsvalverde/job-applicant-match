import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#41A9B9',
    },
    secondary: {
      main: '#6E2B77',
    },
    text: {
      primary: '#11273A',
      secondary: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 5,
  },
});

export default theme;
