import React from 'react';
import axios from 'axios';
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthForm from '../components/AuthForm';
import usePromise from '../utils/hooks/usePromise';
import useInputs from '../utils/hooks/useInputs';


const SignUp = ({history}) => {
    const [state, onChange] = useInputs({
        email: '',
        username: '',
        password: ''
    })
    
    const handleSubmit = async (event) => {
        event.preventDefault();
                
        const response = await axios.post('/auth/signup', JSON.stringify(state));
        
        if (response.data.success === true){
            history.push('/auth/signin')
        }
    }
    
    return(
        <AuthForm height="45%" handleSubmit={handleSubmit}>
            <Input icon={faEnvelope} iconPosition="has-icons-left" placeholder="Email" type="text" name="email" value={state.email} onChange={onChange}/>
            <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} onChange={onChange}/>
            <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" onChange={onChange}/>
            <Input icon={faLock} iconPosition="has-icons-left" placeholder="Check Password" type="password" name="password2"/>
            <Button color="is-info" content="SignUp" helpText="SignIn" /> 
        </AuthForm>
    )
}

export default SignUp;
