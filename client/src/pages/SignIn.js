import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthForm from '../components/AuthForm';
import useInputs from '../utils/hooks/useInputs';
import useAxios from 'axios-hooks';

const SignIn = () => {
    const [state, onChange] = useInputs({
        username: '',
        password: ''
    })
    const [{data}, refetch] = useAxios({url: '/auth/signin', method: 'POST'}, {manual: true});
    
    const handleSubmit = async (event) => {
        event.preventDefault();
                
        const response = await refetch({data: JSON.stringify(state)});
        
        console.log(response.data)
        
        if (response.data.success === true){
            
            // history.push('/auth/signin')
        }
    }
    
    return(
        <AuthForm height="25%" handleSubmit={handleSubmit}>
            <Input icon={faUser} iconPosition="has-icons-left" placeholder="Username" type="text" name="username" value={state.username} onChange={onChange}/>
            <Input icon={faLock} iconPosition="has-icons-left" placeholder="Password" type="password" name="password" onChange={onChange}/>
            <Button color="is-info" content="SignIn" helpText="SignUp" />
        </AuthForm>
    )
}

export default SignIn;