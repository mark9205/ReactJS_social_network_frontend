
import {connect} from "react-redux";
import News from "./News";
import {
    addArticleActionCreator,
    updateNewArticleTextActionCreator,
    updateNewArticleTitleActionCreator
} from "../../redux/news-reducer";


const mapStateToProps = (state) => {
    return {
        state: state.newsPage.articles,
        newArticleTitle: state.newsPage.newArticleTitle,
        newArticleText: state.newsPage.newArticleText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewTitle: (title) => {
            dispatch(updateNewArticleTitleActionCreator(title))
        },
        updateNewText: (text) => {
            dispatch(updateNewArticleTextActionCreator(text))
        },
        addArticle: () => {
            dispatch(addArticleActionCreator())
        }
    }
}

const MyNewsContainer = connect(mapStateToProps, mapDispatchToProps)(News)

export default MyNewsContainer