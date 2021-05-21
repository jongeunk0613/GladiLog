const SET_USERNAME = 'user/SET_USERNAME';
const CLEAR_USERNAME = 'user/CLEAR_USERNAME';

export const setUsername = (username) => ({
    type: SET_USERNAME,
    username
})

export const clearUsername = () => ({
    type: CLEAR_USERNAME
})

const initialState = {
    username: null
}

const user = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        case CLEAR_USERNAME:
            return {
                ...state,
                username: null
            }
        default:
            return state;
    }
}

export default user;