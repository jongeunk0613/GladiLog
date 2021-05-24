import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import Post from '../components/Post';
import Comment from '../components/Comment';

const PostDetail = ({history}) => {
    const { id } = useParams();
    const { username } = useSelector(state => state.user);
    const [loading, post, error] = usePromise(() => api.getPost(id), []);
    
    const handleCancel = async () => {
        try {
            if (username !== post.username){
                alert("You are not allowed to delete this post.");
                return;
            }
            const response = await api.deletePost(id);

            if (response.status === 202){
                history.push('/');
            }
        } catch (e){
            console.log(e);
        }
    }
    
    const handleEdit = async () => {
        if (username !== post.username){
            alert("You are not allowed to edit this post.");
            return;
        }
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
            <Comment />
        </>
    );
}

export default PostDetail;