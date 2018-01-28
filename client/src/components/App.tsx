import * as React from 'react';
import { StatelessComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { Header } from './header/Header';

export const App: StatelessComponent = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes />
      </div>
    </BrowserRouter>
  );
}