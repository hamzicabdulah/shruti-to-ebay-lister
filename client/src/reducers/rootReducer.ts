import { combineReducers, Reducer } from 'redux';
import { usersReducer as users } from './usersReducer';

export const rootReducer: Reducer<{}> = combineReducers({
    users
});