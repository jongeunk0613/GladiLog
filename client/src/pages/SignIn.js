import React from 'react';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../modules/message';
import { setUsername } from '../modules/user';

import * as api from '../lib/api';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';
import useInputs from '../hooks/useInputs';
import Message from '../components/Message';
import clientMessage from '../lib/clientMessage';
import useValidations from '../hooks/useValidations';

const SignIn = ({history}) => {
    const [state, onChange] = useInputs({
        username: '',
        password: ''
    });
    const [isValid, setValid] = useValidations({
        username: false,
        password: false,
    })
    const {content, type, show} = useSelector(state => state.message);
    const dispatch = useDispatch();
    const setMessageCall = (content, type, show) => dispatch(setMessage(content, type, show));
    
    const onInput = (e) => {
        setValid(e);
        onChange(e);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!state.username || !state.password){
            setMessageCall(clientMessage.notValid, 'is-warning', true);
            return;
        } 
        
        setMessageCall(clientMessage.waitingServerResponse, 'is-warning', true);
        try {
            const response = await api.signin(JSON.stringify(state));
            if (response.status === 200) {
                dispatch(setUsername(response.data.username));
                history.push('/');
            }
            
        } catch(e) {
            setMessageCall(e.response.data.msg, 'is-danger', true);
        }
    }
    
    return(
        <>
            <Message content={content} type={type} show={show}/>
            <AuthForm height="18rem" handleSubmit={handleSubmit}>
                <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} isValid={isValid.username} onChange={onInput} validationMessage={clientMessage.notEmpty}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" value={state.password} isValid={isValid.password} onChange={onInput} validationMessage={clientMessage.notEmpty}/>
                <Button color="is-info" content="로그인" helpText="회원가입" helpTextUrl="signup" marginTop="1rem"/>
            </AuthForm>
        </>
    )
}

export default SignIn;