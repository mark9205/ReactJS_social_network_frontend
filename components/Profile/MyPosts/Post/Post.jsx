import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://i.pinimg.com/236x/35/74/20/3574208d2f666b42fb746e6117a3787f--silhouette-cameo-pandas.jpg"
                 alt=""/>
            {props.message}
            <div>
                <span>like</span>
                {props.likesCount}
            </div>
        </div>
    )
}

export default Post