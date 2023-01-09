import React, {useCallback, useEffect, useState} from 'react';
import {Board} from "./Board/Board";
import {Button} from "./Button/Button";
import s from './Counter.module.css';
import {SettingsType} from "../App";
import {useNavigate} from "react-router-dom";

type CounterPropsType = {
    settings: SettingsType
    setSwitcher: (switcher: boolean) => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {

    const {settings: {startValue, maxValue, info, error, switcher}, setSwitcher} = props

    const CounterStep = 1

    const [counter, setCounter] = useState<number>(startValue)

    const navigate = useNavigate()

    const SwitcherName = switcher ? 'Switch to SOLID' : 'Switch to Separate'

    const setSwitchSeparateCallback = () => {
        setSwitcher(!switcher)
    }

    const increaseCounter = () => {
        counter < maxValue && setCounter(counter + CounterStep)
    }

    const resetCounter = useCallback( () => {
            setCounter(startValue)
        }
    , [startValue])

    const settingsOnClickCallback = () => {
        navigate('/settings')
    }

    useEffect( () => resetCounter(), [props, resetCounter])

    const counterLimit = !!(counter >= maxValue || info || error)
    const counterLimit2 = !!(counter <= startValue || info || error)

    return (<>
            <Button name={SwitcherName} callback={setSwitchSeparateCallback} />
            <div className={s.counterParent}>
                <Board currentCounter={counter} maxValue={maxValue} info={info} error={error}/>
                <div>
                    <Button name={'Increase'}
                            callback={increaseCounter}
                            disabled={counterLimit}/>
                    <Button name={'Reset'}
                            callback={resetCounter}
                            disabled={counterLimit2}/>
                    {switcher &&
                        <Button name={'Settings'}
                                callback={settingsOnClickCallback}
                        />
                    }
                </div>
            </div>
        </>
    );
};
