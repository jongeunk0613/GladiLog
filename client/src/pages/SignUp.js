import React, { useState } from 'react';
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import Input from '../components/Input';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';
import useInputs from '../utils/hooks/useInputs';
import Message from '../components/Message';


const SignUp = ({history}) => {
    const [state, onChange] = useInputs({
        email: '',
        username: '',
        password: ''
    });
    const [message, setMessage] = useState({content: 'something', type: '', show: false});
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setMessage({content: 'Waiting for the server to respond...', type: 'is-warning', show: true});
        try {
            const response = await axios.post('/auth/signup', JSON.stringify(state))
            if (response.status === 200) {
                setMessage({content: response.data.msg, type: 'is-success', show: true});
                setTimeout(() => {
                    history.push('/auth/signin');
                }, 1500);
            }
            
        } catch(e) {
            setMessage({content: e.response.data.msg, type: 'is-danger', show: true});
        }
    }
    
    return(
        <>
            <Message content={message.content} type={message.type} show={message.show}/>
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
