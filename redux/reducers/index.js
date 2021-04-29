import { combineReducers } from 'redux';

import videos from './videos';
import favorites from './favorites';

const rootReducer = combineReducers({
    videos,
    favorites,
});

export default rootReducer;
