import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import posts from './posts';
import post from './post';
import sidebar from './sidebar';
import algoliasearch from './algoliasearch';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  posts,
  post,
  sidebar,
  algoliasearch
});
