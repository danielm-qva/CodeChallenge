import { createStore, applyMiddleware, compose } from 'redux';
import notificationMiddleware from './notification-middleware';
import errorMiddleware from './error-middleware';
import loggerMiddleware from './logger-middleware';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer, { IRootState } from '../shared/reducers';

import './axios-interceptor'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const defaultMiddlewares = [
  thunkMiddleware,
  errorMiddleware,
  notificationMiddleware,
  promiseMiddleware,
  loggerMiddleware
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialize = (initialState?: IRootState, middlewares = []) => createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...defaultMiddlewares, ...middlewares))
);

export default initialize;
