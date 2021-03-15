import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import NavigationMenu from './NavigationMenu';

interface Props {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
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
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  nav: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const PageLayout = ({ isDrawerOpen, toggleDrawer, children }: Props) => {
  const classes = useStyles();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Drawer open={isDrawerOpen} anchor="right" onClose={toggleDrawer}>
        <Box p={2} bgcolor="primary.main" height="100%">
          <NavigationMenu />
        </Box>
      </Drawer>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="primary.main"
        p={2}
      >
        <div className={classes.logo}>Logo</div>
        <MenuIcon
          className={classes.menuButton}
          color="secondary"
          onClick={toggleDrawer}
        />
        <div className={classes.nav}>
          <NavigationMenu />
        </div>
      </Box>
      <Box
        flex={1}
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
