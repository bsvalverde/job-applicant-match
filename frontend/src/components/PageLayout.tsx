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
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      borderBottom: [[1, 'solid', theme.palette.primary.main]],
    },
  },
  nav: {
    '& > *:not(:first-child)': {
      marginLeft: theme.spacing(1),
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
        bgcolor="secondary.main"
        p={2}
      >
        <div className={classes.logo}>Logo</div>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.nav}
        >
          <Typography variant="body1" color="primary">
            <Link to="/jobs" className={classes.link}>
              <FormattedMessage id="jobs" />
            </Link>
          </Typography>
          <Typography variant="body1" color="primary">
            <Link to="/applicants" className={classes.link}>
              <FormattedMessage id="applicants" />
            </Link>
          </Typography>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default PageLayout;
