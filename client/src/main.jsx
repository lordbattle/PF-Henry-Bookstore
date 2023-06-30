import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import {store} from "./redux/store/index.js"
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Auth0Provider 
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}>
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
