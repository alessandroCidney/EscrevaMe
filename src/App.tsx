// React
import React from 'react';

// React Router DOM
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { JoinUsPage } from './pages/JoinUsPage';
import { UserPage } from './pages/UserPage';
import { EssayPage } from './pages/EssayPage';
import { NewEssayPage } from './pages/NewEssayPage';

// Contexts
import { GoogleAuthContextProvider } from './contexts/GoogleAuthContext';
import { EmailAuthContextProvider } from './contexts/EmailAuthContext';

// SASS
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <GoogleAuthContextProvider>
        <EmailAuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/joinus" exact component={JoinUsPage} />
            <Route path="/users/:id" component={UserPage} />
            <Route path="/essays/new" exact component={NewEssayPage} />
            <Route path="/essays/:username/:title" component={EssayPage} />
          </Switch>
        </EmailAuthContextProvider>
      </GoogleAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
