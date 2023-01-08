import React from 'react';
import s from './Button.module.css';

type ButtonPropsType = {
    name: string
    callback?: ()=> void
    disabled?: boolean
}

export const Button:React.FC<ButtonPropsType> = (props) => {

    const onClickCallbackHandler = () => {
        props.callback?.()
    }

    const buttonStyle = `${props.disabled ? s.disabled : s.default}`

    return (
        <button onClick={onClickCallbackHandler}
                disabled={props.disabled}
                className={buttonStyle}
        >{props.name}</button>
    );
};
