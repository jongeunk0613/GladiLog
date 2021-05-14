import { combineReducers } from 'redux';
import message from './message';
import user from './user';

const rootReducer = combineReducers({
    message,
    user
})

export default rootReducer;