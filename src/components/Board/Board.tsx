import React from 'react';
import s from './Board.module.css';

type BoardPropsType = {
    currentCounter: number
    maxValue: number
    info: string
    error: string
}

export const Board:React.FC<BoardPropsType> = (props) => {

    const {currentCounter, maxValue, info, error} = props

    const boardStyle = `${s.default} ${currentCounter >= maxValue && s.high} ${error && s.error} ${info && s.info}`

    return (
        <div className={boardStyle}>
            <h1 >{error ? error : info ? info : currentCounter}</h1>
        </div>
    );
};