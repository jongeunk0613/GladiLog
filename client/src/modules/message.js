const SET_MESSAGE = 'messages/SET';
const TOGGLE_MESSAGE = 'messages/TOGGLE';

export const setMessage = (content, type, show) => ({
    type: SET_MESSAGE,
    message: {
        content,
        type,
        show
    }
})

export const toggleMessage = (show) => ({
    type: TOGGLE_MESSAGE,
    show
})

const initialState = {
    content: 'something',
    type: '',
    show: false
}

const message = (state = initialState, action) => {
    switch(action.type){
        case SET_MESSAGE:
            return action.message;
        case TOGGLE_MESSAGE:
            return {
                ...state,
                show: !state.show
            }
        default:
            return state;
    }
}

export default message;