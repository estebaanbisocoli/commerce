import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer as form } from 'redux-form';

import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, applyMiddleware } from 'redux';
const rootReducer = combineReducers({ form });
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
