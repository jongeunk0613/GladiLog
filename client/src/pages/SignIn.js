import React, { useState } from 'react';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

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
    const [message, setMessage] = useState({content: 'something', type: '', show: false});
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setMessage({content: 'Waiting for the server to respond...', type: 'is-warning', show: true});
        try {
            const response = await axios.post('/auth/signin', JSON.stringify(state))
            if (response.status === 200) {
                setMessage({content: response.data.msg, type: 'is-success', show: true});
                history.push('/');
            }
            
        } catch(e) {
            setMessage({content: e.response.data.msg, type: 'is-danger', show: true});
        }
    }
    
    return(
        <>
            <Message content={message.content} type={message.type} show={message.show}/>
            <AuthForm height="30%" handleSubmit={handleSubmit}>
                <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} onChange={onChange}/>
                <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" onChange={onChange}/>
                <Button color="is-info" content="SignIn" helpText="SignUp" />
            </AuthForm>
        </>
    )
}

export default SignIn;