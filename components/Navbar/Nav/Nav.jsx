import React from 'react';
import classes from './Nav.module.css'
import {NavLink} from "react-router-dom";
import s from './Friends.module.css'

const Nav = (props) => {

    let friendItems = props.frItem.map(
        friend => (<div><img src={friend.img} alt=''/>{friend.name}</div>))

    return (
        <div>
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to='/profile' activeClassName={classes.activeLink}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/dialogs' activeClassName={classes.activeLink}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/news' activeClassName={classes.activeLink}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/users' activeClassName={classes.activeLink}>Users</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/music' activeClassName={classes.activeLink}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/settings' activeClassName={classes.activeLink}>Settings</NavLink>
            </div>
        </nav>
            <div className={s.friends}>
                Friends
                <div className={s.friends_item}>
                    {friendItems}
                </div>
            </div>
        </div>

    )
}

export default Nav