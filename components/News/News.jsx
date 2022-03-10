import React from 'react'
import New from "./New";
import s from './News.module.css'

const News = (props) => {

    let Article = props.state.map(a => <New title={a.title} text={a.text} date={a.date}/>)
    let newArticleText = props.newArticleText;
    let newArticleTitle = props.newArticleTitle;


    let onAddArticle = () => {
        props.addArticle();
    }

    let onTitleChange = (e) => {
        let title = e.target.value;
        props.updateNewTitle(title);
    }

    let onTextChange = (e) => {
        let text = e.target.value;
        props.updateNewText(text);
    }

    return (
        <div className={s.body}>
            <div>
                {Article}
            </div>
            <p>Добавление новой статьи</p>
            <div>
                <textarea className={s.area1}
                          onChange={onTitleChange}
                          value={newArticleTitle}
                          placeholder='название статьи'/>
            </div>
            <div>
                <textarea className={s.area2}
                          onChange={onTextChange}
                          value={newArticleText}
                          placeholder='текст статьи'/>
            </div>
            <div>
                <button className={s.btn3} onClick={onAddArticle}>Добавить статью</button>
            </div>
        </div>
    );
}

export default News