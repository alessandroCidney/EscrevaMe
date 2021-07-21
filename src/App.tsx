// React
import React from 'react';

// React Router DOM
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import { LoginPage } from './pages/LoginPage';
import { UserPage } from './pages/UserPage';
import { EssayPage } from './pages/EssayPage';

// Contexts
import { GoogleAuthContextProvider } from './contexts/GoogleAuthContext';

// SASS
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <GoogleAuthContextProvider>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/users/:id" exact component={UserPage} />
          <Route path="/essays/:id" exact component={EssayPage} />
        </Switch>
      </GoogleAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
