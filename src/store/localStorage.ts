import {AppRootStateType} from "../types/types";

export const loadStateFromLS = () => {
    try {
        const serializedState = localStorage.getItem('counterState');
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    }
    catch (err) {
        return undefined
    }
}

export const saveStateToLS = (state: AppRootStateType) => {
    try {
        const serializedState = JSON.stringify({...state, counter: {...state.counter, info: ''}})
        localStorage.setItem('counterState', serializedState)
    } catch {
        // ignore write errors
    }
}

export const throttle = <T>(callback: (arg: T)=>void, time: number) => {
    let timer: number | null = null;
    return (arg: T) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = +setTimeout(()=>{
            callback(arg)
            if(timer)clearTimeout(timer)
            timer = null
            console.log('saved')
        }, time)
    }
}

export const throttledSaveStateToLS = throttle(saveStateToLS, 1000)