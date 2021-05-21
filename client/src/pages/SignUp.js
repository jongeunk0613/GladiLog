import React, { useState, useCallback } from 'react';
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { set, toggle } from '../modules/message';

import * as api from '../lib/api';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';
import useInputs from '../hooks/useInputs';
import Message from '../components/Message';
import clientMessage from '../lib/clientMessage';
import { isEmail, isPassword, isCheckPassword, isNotEmpty } from '../lib/validator';

const SignUp = ({history}) => {
    const [state, onChange] = useInputs({
        email: '',
        username: '',
        password: '',
        password2: ''
    });
    const [isValid, onValid] = useState({
        email: false,
        username: false,
        password: false,
        password2: false
    });
    const {content, type, show} = useSelector(state => state.message);
    const dispatch = useDispatch();
    const setMessage = useCallback((content, type, show) => dispatch(set(content, type, show)), [dispatch]);
    const toggleMessage = useCallback(() => dispatch(toggle()), [dispatch]);
    
    const onInput = (e) => {
        switch(e.target.name){
            case 'email':
                onValid({...isValid, email: isEmail(e.target.value)});
                break;
            case 'password':
                onValid({...isValid, password: isPassword(e.target.value), password2: isCheckPassword(state.password2, e.target.value)});
                break;
            case 'password2':
                onValid({...isValid, password2: isCheckPassword(e.target.value, state.password)});
                break;
            case 'username':
                onValid({...isValid, username: isNotEmpty(e.target.value)});
                break;
            default:
        }
        onChange(e);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!isValid.email || !isValid.username || !isValid.password || !isValid.password2){
            setMessage('The form is not correcty filled out.', 'is-warning', true);
            return;
        } 
        
        setMessage('Waiting for the server to respond...', 'is-warning', true);
        try {
            const response = await api.signup(JSON.stringify(state));
            if (response.status === 201) {
                setMessage(response.data.msg, 'is-success', true);
                setTimeout(() => {
                    toggleMessage();
                    history.push('/auth/signin');
                }, 1500);
            }
            
        } catch(e) {
            setMessage(e.response.data.msg, 'is-danger', true);
        }
    }
    
    return(
        <>
            <Message content={content} type={type} show={show}/>
            <AuthForm height="25rem" handleSubmit={handleSubmit}>
                <Input icon={faEnvelope} iconPosition="has-icons-left" placeholder="Email" type="text" name="email" value={state.email} onChange={onInput} isValid={isValid.email} validationMessage={clientMessage.email}/>
                <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} onChange={onInput} isValid={isValid.username} validationMessage={clientMessage.notEmpty}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" value={state.password} onChange={onInput} isValid={isValid.password} validationMessage={clientMessage.password}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Check Password" type="password" name="password2" value={state.password2} onChange={onInput} isValid={isValid.password2} validationMessage={clientMessage.password2}/>
                <Button color="is-info" content="SignUp" helpText="SignIn" /> 
            </AuthForm>
        </>
    )
}

export default SignUp;
