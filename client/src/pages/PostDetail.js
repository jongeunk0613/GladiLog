import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import Post from '../components/Post';
import Comment from '../components/Comment';

const PostDetail = ({history}) => {
    const { postID } = useParams();
    const { username } = useSelector(state => state.user);
    const [loading, post, error] = usePromise(() => api.getPost(postID), []);
    
    const handleDelete = async () => {
        try {
            if (username !== post.username){
                alert("해당 게시글을 지울 수 없습니다.");
                return;
            }
            const response = await api.deletePost(postID);

            if (response.status === 202){
                history.push('/');
            }
        } catch (e){
            console.log(e);
        }
    }
    
    const handleEdit = async () => {
        if (username !== post.username){
            alert("해당 게시글을 수정할 수 없습니다.");
            return;
        }
        history.push(`/post/edit/${postID}`);
    }
    
    if (loading) {
        return <h1> LOADING </h1>
    }
    
    if (error) {
        return <p>{error}</p>
    }
    
    return (
        <>
            {post && <Post post={post} handleEdit={handleEdit} handleDelete={handleDelete}/>}
            <Comment />
        </>
    );
}

export default PostDetail;