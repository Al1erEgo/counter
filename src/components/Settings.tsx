import React, {useCallback, useEffect, useState} from 'react';
import s from "./Settings.module.css";
import {Button} from "./Button/Button";
import {Input} from "./Input/Input";
import {SettingsType} from "../App";

type SettingsPropsType = {
    settings: SettingsType
    setSettings: (startValue: number, maxValue: number, info: string, error: string) => void
    setInfo: (info: string) => void
    setError: (error: string) => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {

    const {settings, setSettings, setInfo, setError} = props

    const [startValue, setStartValue] = useState<number>(settings.startValue)
    const [maxValue, setMaxValue] = useState<number>(settings.maxValue)

    const buttonCondition = ((startValue === settings.startValue && maxValue === settings.maxValue) || !!(settings.error))

    const maxValueImportError = maxValue < 0 || startValue > maxValue
    const startValueImportError = startValue < 0 || startValue > maxValue

    const setSettingsCallbackHandler = () => {
        setSettings(startValue, maxValue, '', '')
    }

    const onFocusCallback = () => {
        // !settings.info && !settings.error && setSettings(settings.startValue, settings.maxValue, "Enter values and press Set", settings.error)
        !settings.info && !settings.error && setInfo("Enter values and press Set")
    }

    const onBlurCallback = () => {
        setSettings(settings.startValue, settings.maxValue, "", settings.error)
    }

    const errorMessage = startValue < 0 || maxValue < 0 ? 'Value must be positive!' : startValue > maxValue ? 'Max value must be greater than start value' : ''

    // const setErrorHandler = (errorMessage: string) => {
    //     // const errorMessage = startValue < 0 || maxValue < 0 ? 'Value must be positive!' : startValue > maxValue ? 'Max value must be greater than start value' : ''
    //     // settings.error !== errorMessage && setSettings(settings.startValue, settings.maxValue, settings.info, errorMessage)
    //     settings.error !== errorMessage && setError(errorMessage)
    // }

    const setErrorHandler = useCallback((errorMessage: string) => {
        settings.error !== errorMessage && setError(errorMessage)
    }, [settings.error, setError])

    useEffect(() => setErrorHandler(errorMessage), [errorMessage, setErrorHandler])


    return (
        <div className={s.settingsParent}>
            <div className={s.header}>
                <p>CURRENT VALUES:</p>
                <p>Max value: {settings.maxValue} && Start value: {settings.startValue}</p>
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
                <Button name={'Set'} callback={setSettingsCallbackHandler} disabled={buttonCondition}/>
            </div>
        </div>
    );
};

