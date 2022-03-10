import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'I am fine! It my first post!', likesCount: 11},
                {id: 3, message: 'Yoooo!', likesCount: 99},
            ],
            newPostText: "It-Kamasutra"
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi, how are you?'},
                {id: 2, message: 'Hi, I am fine!?'},
                {id: 3, message: 'Do you learning React?'},
                {id: 4, message: 'Yo!'}
            ],
            newMessageText: "new-message",
            dialogs: [
                {id: 1, name: 'Natasha', img: 'https://pbs.twimg.com/media/EZuwU1AWkAA1upd.jpg'},
                {id: 2, name: 'Marat', img: 'https://rload.eu/data/avatars/o/0/49.jpg?1546985811'},
                {
                    id: 3,
                    name: 'Andrew',
                    img: 'https://sun9-14.userapi.com/TTux0ucj4J6aZzjY-JETyWPi3WEwtlhBebHYqg/mdT6wBoDVs0.jpg'
                },
                {
                    id: 4,
                    name: 'Maria',
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/300px-Macaca_nigra_self-portrait_large.jpg'
                }
            ]
        },
        siteBar: {
            friends: [
                {
                    id: 1,
                    name: 'Valery',
                    img: 'https://assets.faceit-cdn.net/avatars/c1877281-c815-4f1e-b7c1-748f37867d5a_1550985853380.jpg'
                },
                {
                    id: 2,
                    name: 'Valentina',
                    img: 'https://sun1-24.userapi.com/c845523/v845523525/20d1f5/jg1oeuOOVfc.jpg'
                },
                {
                    id: 3,
                    name: 'Gleb',
                    img: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP1566-CUSA03655_00-AV00000000000019/1590753122000/image?w=240&amp;h=240&amp;bg_color=000000&amp;opacity=100&amp;_version=00_09_000'
                }
            ]
        }
    },
    _callSubscriber() {

    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.siteBar = sidebarReducer(this._state.siteBar, action);
        this._callSubscriber(this._state)
    }
}

export default store;
window.store = store;