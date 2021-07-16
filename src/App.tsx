import React from 'react';
import { LoginPage } from './pages/LoginPage';
import { JoinUsPage } from './pages/JoinUsPage';

import './styles/global.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/joinus" component={JoinUsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
