import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  logo: {
    backgroundImage:
      'url(https://d4zjpv0aa4kr2.cloudfront.net/assets/logos/geekhunter-inverse-106299cc99e0a518961a226a1d0b53099cfa6b329f0852524bcabd760aafa6f0.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    width: 184,
    height: 32,
    textIndent: '100%',
    overflow: 'hidden',
  },
  link: {
    fontWeight: 'bold',
    color: 'inherit',
    textDecoration: 'none',
    paddingTop: theme.spacing(0.5),
    '&:hover': {
      borderTop: [[1, 'solid', theme.palette.secondary.main]],
    },
  },
  nav: {
    '& > *:not(:first-child)': {
      marginLeft: theme.spacing(1.5),
    },
  },
}));

const PageLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="space-between"
        bgcolor="primary.main"
        p={2}
      >
        <div className={classes.logo}>Logo</div>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.nav}
        >
          <Typography variant="body2" color="secondary">
            <Link to="/jobs" className={classes.link}>
              <FormattedMessage id="jobs" />
            </Link>
          </Typography>
          <Typography variant="body2" color="secondary">
            <Link to="/applicants" className={classes.link}>
              <FormattedMessage id="applicants" />
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box
        height="100%"
        width="100%"
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="#F8F8F8"
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
