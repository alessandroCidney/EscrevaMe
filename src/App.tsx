import React from 'react';
import { LoginPage } from './pages/LoginPage';
import { UserPage } from './pages/UserPage';
import { EssayPage } from './pages/EssayPage';

import './styles/global.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/users/:id" exact component={UserPage} />
        <Route path="/essays/:id" exact component={EssayPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
