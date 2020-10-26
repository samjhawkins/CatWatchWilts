import React from 'react';
import { render } from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import theme from './themes/theme';
import {
  AuthProvider,
  withAuthContext,
} from './components/wrappers/AuthContext';
import { CatProvider } from './components/wrappers/CatContext';

const CatProviderWithAuth = withAuthContext(CatProvider);

render(
  <Router>
    <AuthProvider>
      <CatProviderWithAuth>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CatProviderWithAuth>
    </AuthProvider>
  </Router>,
  document.getElementById('app'),
);
