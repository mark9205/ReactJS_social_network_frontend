import React from 'react'
import s from '../Nav/Friends.module.css'

const Friends = (props) => {
    let friendItems = props.frItem.map(
        friend => (<div><img src={friend.img}/>{friend.name}</div>))

    return (
        <div className={s.friends}>
            Friends
            <div className={s.friends_item}>
                {friendItems}
            </div>
        </div>

    );
}

export default Friends