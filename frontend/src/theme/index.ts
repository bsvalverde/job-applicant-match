import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6E2B77',
    },
    secondary: {
      main: '#41A9B9',
    },
    text: {
      primary: '#11273A',
      secondary: '#6B757D',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
