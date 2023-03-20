import {combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./counterReducer";
import {loadStateFromLS, throttledSaveStateToLS} from "./localStorage";

export const rootReducer = combineReducers({
    counter: counterReducer,
})

const persistedState = loadStateFromLS()
export const store = legacy_createStore(rootReducer, persistedState)

store.subscribe(()=>{
    throttledSaveStateToLS({
        counter: store.getState().counter
    })
})