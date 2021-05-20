import React, { useState, useCallback } from 'react';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../modules/message';
import { setUsername } from '../modules/user';

import * as api from '../lib/api';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';
import useInputs from '../hooks/useInputs';
import Message from '../components/Message';
import clientMessage from '../lib/clientMessage';
import { isNotEmpty } from '../lib/validator';

const SignIn = ({history}) => {
    const [state, onChange] = useInputs({
        username: '',
        password: ''
    });
    const [isValid, onValidation] = useState({
        username: false,
        password: false,
    })
    const {content, type, show} = useSelector(state => state.message);
    const dispatch = useDispatch();
    const setMessage = useCallback((content, type, show) => dispatch(set(content, type, show)), [dispatch]);
    
    const onInput = (e) => {
        switch(e.target.name){
            case 'username':
                onValidation({
                    ...state,
                    username: isNotEmpty(e.target.value)
                });
                break;
            case 'password':
                onValidation({
                    ...state,
                    password: isNotEmpty(e.target.value)
                })
                break;
            default:
        }
        onChange(e);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!state.username || !state.password){
            setMessage('The form is not correcty filled out.', 'is-warning', true);
            return;
        } 
        
        setMessage('Waiting for the server to respond...', 'is-warning', true);
        try {
            const response = await api.signin(JSON.stringify(state));
            if (response.status === 200) {
                setMessage(response.data.msg, 'is-success', true);
                dispatch(setUsername(response.data.username));
                history.push('/');
            }
            
        } catch(e) {
            setMessage(e.response.data.msg, 'is-danger', true);
        }
    }
    
    return(
        <>
            <Message content={content} type={type} show={show}/>
            <AuthForm height="16rem" handleSubmit={handleSubmit}>
                <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} isValid={isValid.username} onChange={onInput} validationMessage={clientMessage.notEmpty}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" value={state.password} isValid={isValid.password} onChange={onInput} validationMessage={clientMessage.notEmpty}/>
                <Button color="is-info" content="SignIn" helpText="SignUp" />
            </AuthForm>
        </>
    )
}

export default SignIn;