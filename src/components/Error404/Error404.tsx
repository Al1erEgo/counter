import React from 'react';
import {Button} from "../Button/Button";
import {useNavigate} from "react-router-dom";
import s from "./Error404.module.css";

export const Error404: React.FC = () => {

    const navigate = useNavigate()

    const backToCounterCallback = () => {
        navigate('/counter')
    }

    return (<>
            <h1 className={s.error}>You entered a wrong address!</h1>
            <div>
                <Button name={'Back to Counter'} callback={backToCounterCallback}/>
            </div>
        </>
    );
};

