import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import {store} from "./redux/store/index.js"
const REACT_APP_AUTH0_DOMAIN = 'bookstores.us.auth0.com';
const REACT_APP_AUTH0_CLIENT_ID = 'Beeh8eJn498o8IAm5tq0itAgqhqtI35m';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Auth0Provider 
         domain={REACT_APP_AUTH0_DOMAIN}
         clientId={REACT_APP_AUTH0_CLIENT_ID}
         redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
