import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthForm from '../components/AuthForm';


const SignUp = () => {
    return(
        <AuthForm height="45%">
            <Input icon={faEnvelope} iconPosition="has-icons-left" placeholder="Email" />
            <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" />
            <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" />
            <Input icon={faLock} iconPosition="has-icons-left" placeholder="Check Password" />
            <Button color="is-info" content="SignUp" helpText="SignIn" /> 
        </AuthForm>
    )
}

export default SignUp;