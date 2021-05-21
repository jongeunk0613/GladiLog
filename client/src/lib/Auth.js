import React from 'react';
import { useSelector } from 'react-redux';

import Modal from '../components/Modal';

const Auth = ({PageComponent}) => {
    const { username } = useSelector(state => state.user);
    
    if (!username){
        return <Modal contentTitle="Signin required." contentBody={`You must sign in to perform the requested action. ${"\n"} Will be redirected to signin page.`} url="/auth/signin"/>
    }
    
    return (
        <PageComponent/>
    )
}

export default Auth;