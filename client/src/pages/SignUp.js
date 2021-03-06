import React, { useState } from 'react';
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, toggleMessage } from '../modules/message';

import apiCall from '../lib/api';
import { historyPaths } from '../lib/paths';
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
    const [isValid, setValid] = useState({
        email: false,
        username: false,
        password: false,
        password2: false
    });
    const {content, type, show} = useSelector(state => state.message);
    const dispatch = useDispatch();
    const setMessageCall = (content, type, show) => dispatch(setMessage(content, type, show));
    const toggleMessageCall = () => dispatch(toggleMessage());
    
    const onValid = (e) => {
        switch(e.target.name){
            case 'email':
                setValid({...isValid, email: isEmail(e.target.value)});
                break;
            case 'password':
                setValid({...isValid, password: isPassword(e.target.value), password2: isCheckPassword(state.password2, e.target.value)});
                break;
            case 'password2':
                setValid({...isValid, password2: isCheckPassword(e.target.value, state.password)});
                break;
            case 'username':
                setValid({...isValid, username: isNotEmpty(e.target.value)});
                break;
            default:
                return state;
        }
    }
    
    const onInput = (e, comparingState) => {
        onChange(e);
        onValid(e);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!isValid.email || !isValid.username || !isValid.password || !isValid.password2){
            setMessageCall(clientMessage.notValid, 'is-warning', true);
            return;
        } 
        
        setMessageCall(clientMessage.waitingServerResponse, 'is-warning', true);
        try {
            const response = await apiCall('signup', null, JSON.stringify(state));
            if (response.status === 201) {
                setMessageCall(response.data.msg, 'is-success', true);
                setTimeout(() => {
                    toggleMessageCall();
                    history.push(historyPaths.signin);
                }, 1500);
            }
            
        } catch(e) {
            setMessageCall(e.response.data.msg, 'is-danger', true);
        }
    }
    
    return(
        <>
            <Message content={content} type={type} show={show}/>
            <AuthForm height="27rem" handleSubmit={handleSubmit}>
                <Input icon={faEnvelope} iconPosition="has-icons-left" placeholder="Email" type="text" name="email" value={state.email} onChange={onInput} isValid={isValid.email} validationMessage={clientMessage.email}/>
                <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} onChange={onInput} isValid={isValid.username} validationMessage={clientMessage.notEmpty}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" value={state.password} onChange={onInput} isValid={isValid.password} validationMessage={clientMessage.password}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Check Password" type="password" name="password2" value={state.password2} onChange={onInput} isValid={isValid.password2} validationMessage={clientMessage.password2}/>
                <Button color="is-info" content="????????????" helpText="?????????" helpTextUrl="signin" marginTop="2rem"/> 
            </AuthForm>
        </>
    )
}

export default SignUp;
