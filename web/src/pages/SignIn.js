import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthForm from '../components/AuthForm';

const SignIn = () => {
    return(
        <AuthForm height="25%">
            <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" />
            <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" />
            <Button color="is-info" content="SignIn" helpText="SignUp" /> 
        </AuthForm>
    )
}

export default SignIn;