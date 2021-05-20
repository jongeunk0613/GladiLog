import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import Post from '../components/Post';


const PostDetail = ({history}) => {
    const { id } = useParams();
    const [loading, post, error] = usePromise(() => api.getPost(id), []);
    
    const onDelete = async () => {
        try {
            const response = await api.deletePost(id);

            if (response.status === 202){
                history.push('/');
            }
        } catch (e){
            console.log(e)
        }
    }
    
    if (loading) {
        return <h1> LOADING </h1>
    }
    
    if (error) {
        return <p>{error}</p>
    }
    
    return (
        <>
            {post && <Post post={post} onDelete={onDelete}/>}
        </>
    );
}

export default PostDetail;