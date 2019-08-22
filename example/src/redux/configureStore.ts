import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default function configureStore() {
  const middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    middleware.push(createLogger());
  }
  return createStore(reducers, applyMiddleware(...middleware));
}
