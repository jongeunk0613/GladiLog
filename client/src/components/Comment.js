import React, { useState } from 'react';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';

const Comment = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [body, setBody] = useState('');
    
    const onChange = (event) => {
        setBody(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await api.createComment(id, JSON.stringify({body}));
            if (response.status === 201) {
                setBody('');
            }
            
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <>
            <CommentForm body={body} onChange={onChange} handleSubmit={handleSubmit}/>
        </>
    )
}

export default Comment;