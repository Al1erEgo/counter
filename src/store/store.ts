import {combineReducers, createStore} from "redux";
import {counterReducer} from "./counterReducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
})

export const store = createStore(rootReducer)