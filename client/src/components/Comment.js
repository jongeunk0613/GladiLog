import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import apiCall from '../lib/api';
import { historyPaths } from '../lib/paths';
import usePromise from '../hooks/usePromise';
import CommentList from './CommentList';
import Modal from './Modal';

const Comment = () => {
    const { username } = useSelector(state => state.user);
    const [modal, setModal] = useState(false);
    const { postID } = useParams();
    const [body, setBody] = useState('');
    const [isEdit, setEdit] = useState({state: false, commentID: null});
    const [loading, comments, error, setComments] = usePromise(() => apiCall('getComments', postID, null), []);
    
    const onChange = (event) => {
        setBody(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username){
            setModal(true);
        }
        
        try {
            const response = await apiCall('writeComment', postID, JSON.stringify({body}));
            if (response.status === 201) {
                setBody('');
                setComments([response.data.newComment, ...comments])
            }
            
        } catch(e) {
            console.log(e);
        }
    }
    
    const handleEdit = async (commentID, commentUsername) => {
        try {
            if (username !== commentUsername){
                alert("해당 댓글을 수정 할 수 없습니다.");
                return;
            }
            const response = await apiCall('getComment', commentID, null);
            
            if (response.status === 200){
                setEdit({status: true, commentID: commentID});
                setBody(response.data.data.body);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    const handleEditSubmit = async (event, isEdit, body) => {
        event.preventDefault();
        
        if (!username){
            setModal(true);
        }
        
        try {
            const responseCommentEdit = await apiCall('editComment', isEdit.commentID, JSON.stringify({body}));
            
            if (responseCommentEdit.status !== 200) {
                throw(responseCommentEdit.data.msg);
            } 
                        
            const responseEditedComment = await apiCall('getComment', isEdit.commentID, null);
            setBody('');
            setEdit({status: false, commentID: null});
            setComments(comments.map(comment => comment.id === isEdit.commentID? responseEditedComment.data.data : comment));
        } catch(e) {
            console.log(e);
        }
    }
    
    const handleDelete = async (commentID, commentUsername) => {
        try {
            if (username !== commentUsername){
                alert("해당 댓글을 지울 수 없습니다.");
                return;
            }
            const response = await apiCall('deleteComment', commentID);

            if (response.status === 202){
                setComments(comments.filter(comment => comment.id !== commentID));
            }
        } catch (e){
            console.log(e);
        }
    }
    
    return (
        <>
            {modal && <Modal contentTitle="접근 제한" contentBody="로그인이 필요합니다." url="/auth/signin"/>}
            <CommentForm total={comments? comments.length : 0} body={body} onChange={onChange} handleSubmit={handleSubmit} handleEditSubmit={handleEditSubmit} isEdit={isEdit}/>
            <CommentList comments={comments} handleDelete={handleDelete} handleEdit={handleEdit}/>
        </>
    )
}

export default Comment;