import React, {ChangeEvent} from 'react';
import s from './Input.module.css'

type InputPropsType = {
    currentValue: number
    setValue: (value: number) => void
    onFocus?: () => void
    onBlur?: () => void
    error?: boolean
}

export const Input: React.FC<InputPropsType> = (props) => {

    const {currentValue, setValue, onFocus, onBlur, error} = props

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.currentTarget.value))
    }

    const onFocusHandler = () => {
        onFocus?.()
    }

    const onBlurHandler = () => {
        onBlur?.()
    }

    const inputClass = `${s.input} ${error && s.error}`

    return (
        <input type='number'
               className={inputClass}
               value={currentValue}
               onChange={onChangeHandler}
               onFocus={onFocusHandler}
               onBlur={onBlurHandler}
        />
    );
};

