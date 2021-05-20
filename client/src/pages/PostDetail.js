import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import Post from '../components/Post';


const PostDetail = ({history}) => {
    const { id } = useParams();
    const [loading, response, error] = usePromise(() => api.getPost(id), []);
    const [post, setPost] = useState(null);
    
    if (loading) {
        return <h1> LOADING </h1>
    }
    
    if (error) {
        return <p>{error}</p>
    }
    
    if (response){
        setPost(response.data.post);
    }
    
    return (
        
    );
}

export default PostDetail;