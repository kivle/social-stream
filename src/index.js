import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import './styles/index.css';

import App from './components/App';

const state = window.__initialState__ || undefined;
const store = configureStore(state);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
