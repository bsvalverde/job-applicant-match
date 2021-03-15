import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    '& > *:not(:first-child)': {
      marginTop: theme.spacing(1.5),
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      '& > *:not(:first-child)': {
        marginTop: 0,
        marginLeft: theme.spacing(1.5),
      },
    },
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
}));

const NavigationMenu = () => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.root}>
      <Typography variant="body2" color="secondary">
        <Link to="/jobs" className={classes.link}>
          <FormattedMessage id="jobs" />
        </Link>
      </Typography>
      <Typography variant="body2" color="secondary">
        <Link to="/candidates" className={classes.link}>
          <FormattedMessage id="candidates" />
        </Link>
      </Typography>
    </Box>
  );
};

export default NavigationMenu;
