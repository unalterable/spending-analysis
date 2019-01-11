import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = (overrides) => createMuiTheme({
  palette: {
    primary: overrides || purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
  typography: {
    useNextVariants: true,
  },
});

const Theme = ({ primary, children }) => (
  <MuiThemeProvider theme={theme(primary)}>
    {children}
  </MuiThemeProvider>
);

export default Theme;
