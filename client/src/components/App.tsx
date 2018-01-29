import * as React from 'react';
import { StatelessComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

export const App: StatelessComponent = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar title='eBay Lister' />
          <Routes />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}