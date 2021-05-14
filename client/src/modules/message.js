const SET = 'messages/SET';
const TOGGLE = 'messages/TOGGLE';

export const set = (content, type, show) => ({
    type: SET,
    message: {
        content,
        type,
        show
    }
})

export const toggle = (show) => ({
    type: TOGGLE,
    show
})

const initialState = {
    content: '',
    type: '',
    show: false
}

const message = (state = initialState, action) => {
    switch(action.type){
        case SET:
            return action.message;
        case TOGGLE:
            return {
                ...state,
                show: !state.show
            }
        default:
            return state;
    }
}

export default message;