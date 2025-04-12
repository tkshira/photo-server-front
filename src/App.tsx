import React from 'react';
import Main from './main/main';
import './App.css';
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router';
import Auth from './auth/Auth';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
  const clientid = process.env.REACT_APP_AUTH0_CLIENTID || "";
  const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI || "";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientid}
      authorizationParams={{redirect_uri: redirectUri}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
