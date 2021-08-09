// React
import React from 'react';

// React Router DOM
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { JoinUsPage } from './pages/JoinUsPage';
import { UserPage } from './pages/UserPage';
import { EssayPage } from './pages/EssayPage';
import { NewEssayPage } from './pages/NewEssayPage';
import { MainPage } from './pages/MainPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { DataPolicyPage } from './pages/DataPolicyPage';
import { Error404Page } from './pages/Error404Page';

// Contexts
import { GoogleAuthContextProvider } from './contexts/GoogleAuthContext';
import { EmailAuthContextProvider } from './contexts/EmailAuthContext';

// SASS
import './styles/global.scss';
import './styles/policies.scss';

function App() {
  return (
    <BrowserRouter>
      <GoogleAuthContextProvider>
        <EmailAuthContextProvider>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/joinus" exact component={JoinUsPage} />
            <Route path="/main" exact component={MainPage} />
            <Route path="/users/:username" component={UserPage} />
            <Route path="/essays/new" exact component={NewEssayPage} />
            <Route path="/essays/:username/:title" exact component={EssayPage} />
            <Route path="/privacypolicy" exact component={PrivacyPolicyPage} />
            <Route path="/datapolicy" exact component={DataPolicyPage} />
            <Route path="/" component={Error404Page} />
          </Switch>
        </EmailAuthContextProvider>
      </GoogleAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
