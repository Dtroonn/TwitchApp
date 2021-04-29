import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const initStore = () => store;

export const wrapper = createWrapper(initStore);
