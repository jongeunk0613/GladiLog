const SET_USERNAME = 'user/SET_USERNAME';

export const setUsername = (username) => ({
    type: SET_USERNAME,
    username
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
        default:
            return state;
    }
}

export default user;