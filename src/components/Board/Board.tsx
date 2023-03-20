import React from 'react';
import s from './Board.module.css';

type BoardPropsType = {
    title: string
    currentCount: number
    maxValue: number
    info: string
    error: string
}

export const Board: React.FC<BoardPropsType> = ({title, currentCount, maxValue, info, error}) => {

    //Стили в зависимости от наличия сообщений
    const boardStyle = `${s.default} ${currentCount >= maxValue ? s.high : ''} ${error ? s.error : ''} ${info ? s.info : ''}`

    return (
        <div className={boardStyle}>
            <h1>{title}</h1>
        </div>
    );
};