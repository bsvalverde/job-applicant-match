import Box from '@material-ui/core/Box';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { getIntlProps } from '../intl';
import theme from '../theme';
import AppContainer from './AppContainer';

const RootContainer = () => {
  const intlProps = getIntlProps();

  return (
    <IntlProvider {...intlProps}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box height="100%" width="100%">
            <AppContainer />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default RootContainer;
