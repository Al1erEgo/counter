import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
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

    const {
        settings: {startValue, maxValue, info, error, switcher},
        setSwitcher
    } = props

    const [counter, setCounter] = useState<number>(() => {
        const settingsFromLS = localStorage.getItem('Counter')
        return settingsFromLS ? JSON.parse(settingsFromLS) : startValue
    })

    const firstRender = useRef(false)
    useLayoutEffect(() => {
        firstRender.current && setCounter(startValue)
        !firstRender.current && (firstRender.current = true)
    }, [startValue])

    const counterStep = 1

    const switcherName = switcher ? 'Switch to SOLID' : 'Switch to Separate'
    const setSwitchSeparateCallback = () => setSwitcher(!switcher)

    const increaseCounter = () => counter < maxValue && setCounter(counter + counterStep)
    const resetCounter = () => setCounter(startValue)

    const navigate = useNavigate()
    const settingsOnClickCallback = () => navigate('/settings')

    const counterLimit = !!(counter >= maxValue || info || error)
    const counterLimit2 = !!(counter <= startValue || info || error)

    const titleForBoard = error ? error : info ? info : counter.toString()

    useEffect(() => localStorage.setItem('Counter', JSON.stringify(counter)), [counter])

    return (<>
            <Button name={switcherName}
                    callback={setSwitchSeparateCallback}/>
            <div className={s.counterParent}>
                <Board title={titleForBoard}
                       currentCount={counter}
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
