import React from 'react';
import {Board} from "./Board/Board";
import {Button} from "./Button/Button";
import s from './Counter.module.css';
import {SettingsType} from "../App";
import {useNavigate} from "react-router-dom";

type CounterPropsType = {
    settings: SettingsType
    setCounter: (newCounter: number) => void
    setSwitcher: (switcher: boolean) => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {

    const {
        settings: {currentCounter, startValue, maxValue, info, error, switcher},
        setCounter,
        setSwitcher
    } = props

    const counterStep = 1

    const switcherName = switcher ? 'Switch to SOLID' : 'Switch to Separate'
    const setSwitchSeparateCallback = () => setSwitcher(!switcher)

    const increaseCounter = () => currentCounter < maxValue && setCounter(currentCounter + counterStep)
    const resetCounter = () => setCounter(startValue)

    const navigate = useNavigate()
    const settingsOnClickCallback = () => navigate('/settings')

    const counterLimit = !!(currentCounter >= maxValue || info || error)
    const counterLimit2 = !!(currentCounter <= startValue || info || error)

    const titleForBoard = error ? error : info ? info : currentCounter.toString()

    return (<>
            <Button name={switcherName}
                    callback={setSwitchSeparateCallback}/>
            <div className={s.counterParent}>
                <Board title={titleForBoard}
                       currentCount={currentCounter}
                       maxValue={maxValue}
                       info={info}
                       error={error}/>
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
