import { useReducer } from 'react';

import { isEmail, isPassword, isCheckPassword, isNotEmpty } from '../lib/validator';

const reducer = (state, action, isSignUp) => {
    switch(action.name){
        case 'email':
            return {...state, email: isEmail(action.value)};
        case 'password':
            if (isSignUp){
                return {...state, password: isPassword(action.value), password2: isCheckPassword(state.password2, action.value)};
            } else {
                return {...state, password: isNotEmpty(action.value)};
            }
        case 'password2':
            return {...state, password2: isCheckPassword(action.value, state.password)}
        case 'username':
            return {...state, username: isNotEmpty(action.value)};
        default:
            return state;
    }
}

const useValidations = (initialState, isSignUp = false) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = e => {
        dispatch(e.target, isSignUp);
    }
    
    return [state, onChange];
}

export default useValidations;