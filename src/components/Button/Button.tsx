import React from 'react';
import s from './Button.module.css';

type ButtonPropsType = {
    name: string
    callback: () => void
    onMouseDownCallback?: () => void
    disabled?: boolean
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    const onClickCallbackHandler = () => props.callback?.()

    const onMouseDownHandler = () => props.onMouseDownCallback?.()

    const buttonStyle = `${props.disabled ? s.disabled : s.default}`

    return (
        <button onMouseDown={onMouseDownHandler}
                onClick={onClickCallbackHandler}
                disabled={props.disabled}
                className={buttonStyle}
        >{props.name}</button>
    );
};
