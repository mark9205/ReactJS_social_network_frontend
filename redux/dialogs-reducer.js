const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    messages: [
        {id: 1, message: 'Hi, how are you?'},
        {id: 2, message: 'Hi, I am fine!?'},
        {id: 3, message: 'Do you learning React?'},
        {id: 4, message: 'Yo!'}
    ],
    dialogs: [
        {id: 1, name: 'Marat', img: 'https://rload.eu/data/avatars/o/0/49.jpg?1546985811'},
        {
            id: 2,
            name: 'Andrew',
            img: 'https://sun9-14.userapi.com/TTux0ucj4J6aZzjY-JETyWPi3WEwtlhBebHYqg/mdT6wBoDVs0.jpg'
        },
        {
            id: 3,
            name: 'Maria',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/300px-Macaca_nigra_self-portrait_large.jpg'
        }
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {id: 5, message: action.newMessageBody};
            return  {
                ...state,
                messages: [...state.messages, newMessage]
            }
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessageBody ) => ({type: ADD_MESSAGE, newMessageBody})


export default dialogsReducer;