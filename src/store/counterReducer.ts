import {CounterActionsType, CounterType} from "../types/types";


const initialState: CounterType = {
    currentCounter: 0,
    count: 1,
    startValue: 0,
    maxValue: 5,
    info: '',
    error: '',
    switcher: true,
}

export const counterReducer = (state: CounterType = initialState, action: CounterActionsType): CounterType => {
    switch (action.type) {
        case "INCREASE_COUNTER":
            return {...state, currentCounter: state.currentCounter+state.count}
        case "DECREASE_COUNTER":
            return {...state, currentCounter: state.currentCounter-state.count}
        case "RESET_COUNTER":
            return {...state, currentCounter: state.startValue}
        case "SET_ERROR": {
            return {...state, error: action.payload.error}
        }
        case "SET_INFO": {
            return {...state, info: action.payload.info}
        }
        case "SWITCH" : {
            return {...state, switcher: action.payload.switcher}
        }
        case "SET_VALUES" : {
            return {...state, startValue: action.payload.startValue, maxValue: action.payload.maxValue, currentCounter: action.payload.startValue}
        }
        default:
            return state
    }
}


export const increaseCounterAC = () => {
    return {
        type: 'INCREASE_COUNTER'
    } as const
}
export const decreaseCounterAC = () => {
    return {
        type: 'DECREASE_COUNTER'
    } as const
}
export const resetCounterAC = () => {
    return {
        type: 'RESET_COUNTER'
    } as const
}
export const setErrorAC = (error: string) => {
    return {
        type: 'SET_ERROR',
        payload: {
            error,
        }
    } as const
}
export const setInfoAC = (info: string) => {
    return {
        type: 'SET_INFO',
        payload: {
            info,
        }
    } as const
}
export const switchAC = (switcher: boolean) => {
    return {
        type: "SWITCH",
        payload: {
            switcher,
        }
    } as const
}
export const setValuesAC = (startValue: number, maxValue: number) => {
    return {
        type: "SET_VALUES",
        payload: {
            startValue,
            maxValue,
        }
    } as const
}

