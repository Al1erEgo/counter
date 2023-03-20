import React from 'react';
import s from './Button.module.css';

type ButtonPropsType = {
    name: string
    callback?: () => void
    onMouseDownCallback?: () => void
    disabled?: boolean
}

export const Button: React.FC<ButtonPropsType> = ({name, callback, onMouseDownCallback, disabled}) => {

    const onClickCallbackHandler = () => callback?.()

    const onMouseDownHandler = () => onMouseDownCallback?.()

    const buttonStyle = `${disabled ? s.disabled : s.default}`

    return (
        <button onMouseDown={onMouseDownHandler}
                onClick={onClickCallbackHandler}
                disabled={disabled}
                className={buttonStyle}
        >{name}</button>
    );
};
