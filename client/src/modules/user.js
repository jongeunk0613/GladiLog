const SET = 'user/SET';

export const set = (username) => ({
    type: SET,
    username
})

const initialState = {
    username: ''
}

const user = (state = initialState, action) => {
    switch(action.type) {
        case SET:
            return {
                ...state,
                username: action.username
            }
        default:
            return state;
    }
}

export default user;