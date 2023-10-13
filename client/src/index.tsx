import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import store from './store';
import { Provider } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Router />
  </Provider>,
);
