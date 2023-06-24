import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import {store} from "./redux/store/index.js"

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <React.StrictMode>
      <Auth0provider 
      domain={domain} 
      clientId={clientId} 
      redirectUri={window.location.origin}>
        <App />
      </Auth0provider>
    </React.StrictMode>
  </BrowserRouter>
</Provider>
)
