import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import apiCall from '../lib/api';
import { historyPaths } from '../lib/paths';
import usePromise from '../hooks/usePromise';
import Post from '../components/Post';
import Comment from '../components/Comment';

const PostDetail = ({history}) => {
    const { postID } = useParams();
    const { username } = useSelector(state => state.user);
    const [loading, post, error] = usePromise(() => apiCall('getPost', postID, null), []);
    
    const handleDelete = async () => {
        try {
            if (username !== post.username){
                alert("해당 게시글을 지울 수 없습니다.");
                return;
            }
            const response = await apiCall('deletePost', postID, null);

            if (response.status === 202){
                history.push(historyPaths.main);
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
        history.push(historyPaths.postEdit + postID);
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