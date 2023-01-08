import React, {useEffect, useState} from 'react';
import {Board} from "./Board/Board";
import {Button} from "./Button/Button";
import s from './Counter.module.css';
import {SettingsType} from "../App";

type CounterPropsType = {
    settings: SettingsType
}

export const Counter: React.FC<CounterPropsType> = (props) => {

    const {startValue, maxValue, info, error} = props.settings

    const CounterStep = 1

    const [counter, setCounter] = useState<number>(startValue)

    const increaseCounter = () => {
        counter < maxValue && setCounter(counter + CounterStep)
    }

    const resetCounter = () => {
        setCounter(startValue)
    }

    useEffect( () => resetCounter(), [props])

    const counterLimit = !!(counter >= maxValue || info || error)
    const counterLimit2 = !!(counter <= startValue || info || error)

    return (
        <div className={s.counterParent}>
            <Board currentCounter={counter} maxValue={maxValue} info={info} error={error}/>
            <div>
                <Button name={'Increase'}
                        callback={increaseCounter}
                        disabled={counterLimit}/>
                <Button name={'Reset'}
                        callback={resetCounter}
                        disabled={counterLimit2}/>
            </div>
        </div>
    );
};
