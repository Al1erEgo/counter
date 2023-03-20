import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from "./Settings.module.css";
import {Button} from "./Button/Button";
import {Input} from "./Input/Input";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, CounterType} from "../types/types";
import {setErrorAC, setInfoAC, setValuesAC, switchAC} from "../store/counterReducer";


export const Settings: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const state = useSelector<AppRootStateType, CounterType>(state => state.counter)

    //Локальный контроль настроек
    const [startValue, setStartValue] = useState<number>(state.startValue)
    const [maxValue, setMaxValue] = useState<number>(state.maxValue)

    //Состояние кнопок в зависимости от текущих значений инпутов
    const setButtonCondition = useMemo ( () =>((startValue === state.startValue && maxValue === state.maxValue) || !!(state.error)) ,[state.error, startValue, maxValue, state.startValue, state.maxValue])
    const backButtonCondition = !!(state.error)

    //Состояние инпутов в зависимости от текущих значений
    const maxValueImportError = maxValue < 0 || startValue > maxValue
    const startValueImportError = startValue < 0 || startValue > maxValue

    //Установка текущих значений в стор
    const setSettingsCallbackHandler = () => dispatch(setValuesAC(startValue, maxValue))



    //Сообщение для табло, при фокусе на инпутах, если нет других сообщений и ошибок
    const onFocusCallback = () => !state.info && !state.error && dispatch(setInfoAC("Enter values and press Set"))
    //Сообщение при расфокусе
    const onBlurCallback = () => dispatch(setInfoAC(""))

    //Навигация
    const setSwitchSeparateCallback = () => {
        dispatch(switchAC(!state.switcher))
        navigate('/counter')
    }
    const backToCounterCallback = () => navigate('/counter')

    //Сообщение об ошибке в зависимости от текущих значений
    const errorMessage = startValue < 0 || maxValue < 0 ? 'Value must be positive!' : startValue > maxValue ? 'Max value must be greater than start value' : ''
    const setErrorHandler = useCallback((errorMessage: string) => {
        state.error !== errorMessage && dispatch(setErrorAC(errorMessage))
    }, [state.error, dispatch])

    useEffect(() => setErrorHandler(errorMessage), [errorMessage, setErrorHandler])

    const headerStyle = `${s.header} ${errorMessage && state.switcher && s.headerError}`

    return (<>
            {state.switcher &&
                <Button name={'Switch to SOLID'} callback={setSwitchSeparateCallback}/>
            }
            <div className={s.settingsParent}>
                <div className={headerStyle}>
                    {errorMessage && state.switcher ?
                        <>
                            <p>WARNING !!!</p>
                            <p>{errorMessage}</p>
                        </>
                        : state.info && state.switcher ?
                            <p>{state.info}</p>
                            :
                            <>
                                <p>CURRENT VALUES:</p>
                                <p>Max value: {state.maxValue} & Start value: {state.startValue}</p>
                            </>}
                </div>
                <div className={s.inputContainer}>
                    <div className={s.input}>
                        <span>Max value :</span>
                        <Input currentValue={maxValue}
                               setValue={setMaxValue}
                               onFocus={onFocusCallback}
                               onBlur={onBlurCallback}
                               error={maxValueImportError}
                        />
                    </div>
                    <div className={s.input}>
                        <span>Start value :</span>
                        <Input currentValue={startValue}
                               setValue={setStartValue}
                               onFocus={onFocusCallback}
                               onBlur={onBlurCallback}
                               error={startValueImportError}
                        />
                    </div>
                </div>
                <div>
                    <Button name={'Set'}
                            onMouseDownCallback={setSettingsCallbackHandler}
                            disabled={setButtonCondition}/>
                    {state.switcher &&
                        <Button name={'Back to counter'}
                                callback={backToCounterCallback}
                                disabled={backButtonCondition}/>
                    }
                </div>
            </div>
        </>
    );
};

