import React from 'react';
import {Board} from "./Board/Board";
import {Button} from "./Button/Button";
import s from './Counter.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, CounterType} from "../types/types";
import {increaseCounterAC, resetCounterAC, switchAC} from "../store/counterReducer";



export const Counter: React.FC = () => {

    const state = useSelector<AppRootStateType, CounterType>(state => state.counter)
    const dispatch = useDispatch()

    //Название переключателя в зависимости от текущего вида
    const switcherName = state.switcher ? 'Switch to SOLID' : 'Switch to Separate'
    //Колбэк для кнопки переключателя
    const setSwitchSeparateCallback = () => dispatch(switchAC(!state.switcher))

    //Действия с самим счетчиком
    const increaseCounter = () => state.currentCounter < state.maxValue && dispatch(increaseCounterAC())
    const resetCounter = () => dispatch(resetCounterAC())

    //Навигация для переключателя
    const navigate = useNavigate()
    const settingsOnClickCallback = () => navigate('/settings')

    //Ограничение значений каунтера которое дизейблит кнопки
    const counterLimit = !!(state.currentCounter >= state.maxValue || state.info || state.error)
    const counterLimit2 = !!(state.currentCounter <= state.startValue || state.info || state.error)

    //Вывод для табло(ошибка или инфо или счетчик)
    const titleForBoard = state.error ? state.error : state.info ? state.info : state.currentCounter.toString()

    return (<>
            <Button name={switcherName}
                    callback={setSwitchSeparateCallback}/>
            <div className={s.counterParent}>
                <Board title={titleForBoard}
                       currentCount={state.currentCounter}
                       maxValue={state.maxValue}
                       info={state.info}
                       error={state.error}/>
                <div>
                    <Button name={'Increase'}
                            callback={increaseCounter}
                            disabled={counterLimit}/>
                    <Button name={'Reset'}
                            callback={resetCounter}
                            disabled={counterLimit2}/>
                    {state.switcher &&
                        <Button name={'Settings'}
                                callback={settingsOnClickCallback}
                        />
                    }
                </div>
            </div>
        </>
    );
};
