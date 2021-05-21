import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Modal from '../components/Modal';

const Auth = ({PageComponent}) => {
    const { username } = useSelector(state => state.user);
    const history = useHistory();
    
    const onClick = () => {
        history.push('/auth/signin');
    }
    
    if (!username){
        return <Modal contentTitle="Signin required." contentBody={`You must sign in to perform the requested action. ${"\n"} Will be redirected to signin page.`} onClick={onClick}/>
    }
    
    return (
        <PageComponent/>
    )
}

export default Auth;