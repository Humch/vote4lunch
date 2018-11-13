import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import allReducers from './reducers';

import App from './Core/organisms/App';

import './Core/css/index.scss';

const store = createStore(allReducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
));

WebFont.load({
  google: {
    families: ['Courgette']
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
