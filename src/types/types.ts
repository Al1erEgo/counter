//Тип того, что возвращает рутовый редьюсер(тип стейта)
import {rootReducer} from "../store/store";
import {decreaseCounterAC, increaseCounterAC, resetCounterAC, setErrorAC, setInfoAC} from "../store/counterReducer";


export type AppRootStateType = ReturnType<typeof rootReducer>

//Типизация объекта счетчика
export type CounterType = {
    currentCounter: number
    count: number
    startValue: number
    maxValue: number
    info: string
    error: string
    switcher: boolean
}

//Типы экшнов
export type SettingsActionsType = setErrorACType | setInfoACType

export type CounterActionsType =
    increaseCounterACType |
    decreaseCounterACType |
    resetCounterACType |
    setErrorACType |
    setInfoACType

type increaseCounterACType = ReturnType<typeof increaseCounterAC>
type decreaseCounterACType = ReturnType<typeof decreaseCounterAC>
type resetCounterACType = ReturnType<typeof resetCounterAC>
type setErrorACType = ReturnType<typeof setErrorAC>
type setInfoACType = ReturnType<typeof setInfoAC>