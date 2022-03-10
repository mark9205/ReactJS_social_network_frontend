import React from 'react';
import s from './News.module.css'

const New = (props) => {
    return (
        <div className={s.new}>
            <h6>{props.date}</h6>
            <h2>{props.title}</h2>
            <div>
                {props.text}
            </div>
        </div>
    )
}

export default New