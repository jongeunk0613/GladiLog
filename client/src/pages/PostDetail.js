import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import Post from '../components/Post';


const PostDetail = ({history}) => {
    const { id } = useParams();
    const [loading, post, error] = usePromise(() => api.getPost(id), []);
    
    const handleCancel = async () => {
        try {
            const response = await api.deletePost(id);

            if (response.status === 202){
                history.push('/');
            }
        } catch (e){
            console.log(e);
        }
    }
    
    const handleEdit = async () => {
        history.push(`/post/edit/${id}`);
    }
    
    if (loading) {
        return <h1> LOADING </h1>
    }
    
    if (error) {
        return <p>{error}</p>
    }
    
    return (
        <>
            {post && <Post post={post} handleEdit={handleEdit} handleCancel={handleCancel}/>}
        </>
    );
}

export default PostDetail;