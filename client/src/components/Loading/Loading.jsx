import React from "react";
import style from './Loading.module.css';
import manomanoImage from '../../images/MANOMANO100X100.png';

const Loading = () => {
    return (
        <div className={style.container}>
            <img src={manomanoImage} alt="Please Wait..." />
        </div>
    );
};

export default Loading;
