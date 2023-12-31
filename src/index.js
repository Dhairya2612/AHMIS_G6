import React from 'react';
// import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../src/Component/redux/store';
import {SessionTimeoutProvider} from '../src/Component/SessionTimeoutContext';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <SessionTimeoutProvider>
    <App/>
    </SessionTimeoutProvider>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
