import { combineReducers } from 'redux';
import member from "./member";
import authentication from "./session";

export const rootReducer = combineReducers({
    member,
    authentication
});