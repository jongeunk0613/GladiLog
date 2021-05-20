import React from 'react';
import { useParams } from 'react-router-dom';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import useInputs from '../hooks/useInputs';
import PostForm from '../components/PostForm';

const PostEdit = ({history}) => {
    const { id } = useParams();
    const [loading, post, error] = usePromise(() => api.getPost(id), []);
    const [state, onChange] = useInputs({
        title: '',
        body: ''
    });
    
    if (loading) {
        return <h1> LOADING </h1>
    }
    
    if (error) {
        return <p>{error}</p>
    }
    
    const handleCancel = () => {
        history.goBack();
    }
    
    return (
        <>
            {post && <PostForm title="Post Title" value={post.title} body={post.body} submitButtonName="Save" onChange={onChange} handleCancel={handleCancel}/>}
        </>
    )
}

export default PostEdit;