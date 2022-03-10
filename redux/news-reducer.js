const ADD_ARTICLE = 'ADD_ARTICLE';
const UPDATE_NEW_ARTICLE_TEXT = 'UPDATE_NEW_ARTICLE_TEXT';
const UPDATE_NEW_ARTICLE_TITLE = 'UPDATE_NEW_ARTICLE_TITLE';


let initialState = {
    articles: [
        {
            id: 1,
            title: 'React.js: понятное руководство для начинающих',
            text: 'React-разработка заключается в описании того, что нужно вывести на страницу (а не в составлении инструкций для браузера, посвящённых тому, как это делать). Это, кроме прочего, означает значительное сокращение объёмов шаблонного кода.\n' +
                '\n' +
                'В составе Angular, с другой стороны, есть средства командной строки, которые генерируют шаблонный код компонентов. Не кажется ли это немного не тем, чего можно ждать от современных инструментов разработки интерфейсов? Фактически, речь идёт о том, что в Angular так много шаблонного кода, что для того, чтобы его генерировать, даже создано специальное средство.\n' +
                '\n' +
                'В React, приступая к разработке, просто начинают писать код. Тут нет шаблонного кода компонентов, который нужно как-то генерировать. Конечно, перед разработкой нужна некоторая подготовка, но, когда дело доходит до компонентов, их можно описывать в виде чистых функций.',
            date: ''
        }
    ],
    newArticleTitle: '',
    newArticleText: ''
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            let newArticle = {
                id: 2,
                title: state.newArticleTitle,
                text: state.newArticleText,
                date: (new Date().toLocaleString())
            };
            return {
                ...state,
                articles: [...state.articles, newArticle],
                newArticleTitle: '',
                newArticleText: '',
            };

        case UPDATE_NEW_ARTICLE_TITLE:
            return {
                ...state,
                newArticleTitle: action.newTitle
            }

        case UPDATE_NEW_ARTICLE_TEXT:
            return {
                ...state,
                newArticleText: action.newText
            }

        default:
            return state;
    }
}

export const addArticleActionCreator = () => ({type: ADD_ARTICLE})

export const updateNewArticleTitleActionCreator = (title) => ({
    type: UPDATE_NEW_ARTICLE_TITLE, newTitle: title
})

export const updateNewArticleTextActionCreator = (text) => ({
    type: UPDATE_NEW_ARTICLE_TEXT, newText: text
})


export default newsReducer;