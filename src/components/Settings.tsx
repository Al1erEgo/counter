import React, {useCallback, useEffect, useState} from 'react';
import s from "./Settings.module.css";
import {Button} from "./Button/Button";
import {Input} from "./Input/Input";
import {SettingsType} from "../App";
import {useNavigate} from "react-router-dom";

type SettingsPropsType = {
    settings: SettingsType
    setSettings: (startValue: number, maxValue: number, info: string, error: string, switcher: boolean) => void
    setStartValue: (startValue: number) => void
    setInfo: (info: string) => void
    setError: (error: string) => void
    setSwitcher?: (switcher: boolean) => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {

    const {settings, setSettings, setStartValue: setStartValueToSettings, setInfo, setError, setSwitcher} = props

    const [startValue, setStartValue] = useState<number>(settings.startValue)
    const [maxValue, setMaxValue] = useState<number>(settings.maxValue)

    const navigate = useNavigate()

    const setButtonCondition = ((startValue === settings.startValue && maxValue === settings.maxValue) || !!(settings.error))

    const backButtonCondition = !!(settings.error)

    const maxValueImportError = maxValue < 0 || startValue > maxValue
    const startValueImportError = startValue < 0 || startValue > maxValue

    const setSettingsCallbackHandler = () => setSettings(startValue, maxValue, '', '', settings.switcher)
    const setStartValueCallbackHandler = () => setStartValueToSettings(startValue)

    const backToCounterCallback = () => navigate('/counter')

    const onFocusCallback = () => !settings.info && !settings.error && setInfo("Enter values and press Set")

    const onBlurCallback = () => setInfo('')

    const setSwitchSeparateCallback = () => {
        setSwitcher?.(!settings.switcher)
        navigate('/counter')
    }

    const errorMessage = startValue < 0 || maxValue < 0 ? 'Value must be positive!' : startValue > maxValue ? 'Max value must be greater than start value' : ''

    const setErrorHandler = useCallback((errorMessage: string) => {
        settings.error !== errorMessage && setError(errorMessage)
    }, [settings.error, setError])

    useEffect(() => setErrorHandler(errorMessage), [errorMessage, setErrorHandler])

    const headerStyle = `${s.header} ${errorMessage && settings.switcher && s.headerError}`

    return (<>
            {settings.switcher &&
                <Button name={'Switch to SOLID'} callback={setSwitchSeparateCallback}/>
            }
            <div className={s.settingsParent}>
                <div className={headerStyle}>
                    {errorMessage && settings.switcher ?
                        <>
                            <p>WARNING !!!</p>
                            <p>{errorMessage}</p>
                        </>
                        : settings.info && settings.switcher ?
                            <p>{settings.info}</p>
                            :
                            <>
                                <p>CURRENT VALUES:</p>
                                <p>Max value: {settings.maxValue} & Start value: {settings.startValue}</p>
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
                            callback={setSettingsCallbackHandler}
                            onMouseDownCallback={setStartValueCallbackHandler}
                            disabled={setButtonCondition}/>
                    {settings.switcher &&
                        <Button name={'Back to counter'}
                                callback={backToCounterCallback}
                                disabled={backButtonCondition}/>
                    }
                </div>
            </div>
        </>
    );
};

