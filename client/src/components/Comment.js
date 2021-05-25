import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import CommentList from './CommentList';

const Comment = () => {
    const { id } = useParams();
    const [body, setBody] = useState('');
    const [loading, comments, error, setComments] = usePromise(() => api.getComments(id), []);
    
    const onChange = (event) => {
        setBody(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
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
            <CommentForm total={comments? comments.length : 0} body={body} onChange={onChange} handleSubmit={handleSubmit}/>
            <CommentList comments={comments}/>
        </>
    )
}

export default Comment;