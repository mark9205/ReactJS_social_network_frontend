import React from 'react';
import hed from './Header.module.css'
import {NavLink} from "react-router-dom";
import picca from "./../../assets/images/picca-1-128x128.png";

const Header = (props) => {
    return <header className={hed.header}>
        <img src={picca} alt=""/>
        <div className={hed.loginBlock}>
            {props.isAuth
                ? <div>{props.login}<button onClick={props.logout}>Log out</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>;
}

export default Header