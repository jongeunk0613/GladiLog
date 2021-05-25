import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import CommentList from './CommentList';
import Modal from './Modal';

const Comment = () => {
    const { username } = useSelector(state => state.user);
    const [modal, setModal] = useState(false);
    const { id } = useParams();
    const [body, setBody] = useState('');
    const [loading, comments, error, setComments] = usePromise(() => api.getComments(id), []);
    
    const onChange = (event) => {
        setBody(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username){
            setModal(true);
        }
        
        try {
            const response = await api.createComment(id, JSON.stringify({body}));
            if (response.status === 201) {
                setBody('');
                setComments([...comments, response.data.newComment])
            }
            
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <>
            {modal && <Modal contentTitle="Not authorized" contentBody="Signin required." url="/auth/signin"/>}
            <CommentForm total={comments? comments.length : 0} body={body} onChange={onChange} handleSubmit={handleSubmit}/>
            <CommentList comments={comments}/>
        </>
    )
}

export default Comment;