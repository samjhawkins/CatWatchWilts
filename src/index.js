import React from 'react';
import { render } from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './themes/theme';
import {
  AuthProvider,
  withAuthContext,
} from './components/common/wrappers/AuthContext';
import { CatProvider } from './components/common/wrappers/CatContext';

const CatProviderWithAuth = withAuthContext(CatProvider);

render(
  <AuthProvider>
    <CatProviderWithAuth>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CatProviderWithAuth>
  </AuthProvider>,
  document.getElementById('app'),
);
