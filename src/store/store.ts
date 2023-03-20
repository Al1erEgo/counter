import {combineReducers, createStore} from "redux";
import {counterReducer} from "./counterReducer";
import {AppRootStateType} from "../types/types";

export const rootReducer = combineReducers({
    counter: counterReducer,
})

export const store: AppRootStateType = createStore(rootReducer)