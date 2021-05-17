import React, { useCallback } from 'react';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../modules/message';

import * as api from '../lib/api';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';
import useInputs from '../hooks/useInputs';
import Message from '../components/Message';

const SignIn = ({history}) => {
    const [state, onChange] = useInputs({
        username: '',
        password: ''
    });
    const {content, type, show} = useSelector(state => state.message);
    const dispatch = useDispatch();
    const setMessage = useCallback((content, type, show) => dispatch(set(content, type, show)), [dispatch]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setMessage('Waiting for the server to respond...', 'is-warning', true);
        try {
            const response = await api.signin(JSON.stringify(state));
            if (response.status === 200) {
                setMessage(response.data.msg, 'is-success', true);
                history.push('/');
            }
            
        } catch(e) {
            setMessage(e.response.data.msg, 'is-danger', true);
        }
    }
    
    return(
        <>
            <Message content={content} type={type} show={show}/>
            <AuthForm height="30%" handleSubmit={handleSubmit}>
                <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} onChange={onChange}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" onChange={onChange}/>
                <Button color="is-info" content="SignIn" helpText="SignUp" />
            </AuthForm>
        </>
    )
}

export default SignIn;