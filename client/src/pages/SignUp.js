import React, { useCallback } from 'react';
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { set, toggle } from '../modules/message';

import * as api from '../lib/api';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';
import useInputs from '../hooks/useInputs';
import Message from '../components/Message';


const SignUp = ({history}) => {
    const [state, onChange] = useInputs({
        email: '',
        username: '',
        password: ''
    });
    const {content, type, show} = useSelector(state => state.message);
    const dispatch = useDispatch();
    const setMessage = useCallback((content, type, show) => dispatch(set(content, type, show)), [dispatch]);
    const toggleMessage = useCallback(() => dispatch(toggle()), [dispatch]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
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
            <AuthForm height="45%" handleSubmit={handleSubmit}>
                <Input icon={faEnvelope} iconPosition="has-icons-left" placeholder="Email" type="text" name="email" value={state.email} onChange={onChange}/>
                <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} onChange={onChange}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" onChange={onChange}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Check Password" type="password" name="password2"/>
                <Button color="is-info" content="SignUp" helpText="SignIn" /> 
            </AuthForm>
        </>
    )
}

export default SignUp;
