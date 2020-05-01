import React from 'react';
import { render } from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './themes/theme';
import { AuthProvider } from './components/common/wrappers/AuthContext';
import { CatProvider } from './components/common/wrappers/CatContext';

render(
  <AuthProvider>
    <CatProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CatProvider>
  </AuthProvider>,
  document.getElementById('app'),
);
