import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as api from '../lib/api';
import usePromise from '../hooks/usePromise';
import CommentList from './CommentList';
import Modal from './Modal';

const Comment = () => {
    const { username } = useSelector(state => state.user);
    const [modal, setModal] = useState(false);
    const { postID } = useParams();
    const [body, setBody] = useState('');
    const [isEdit, setEdit] = useState({state: false, commentID: null});
    const [loading, comments, error, setComments] = usePromise(() => api.getComments(postID), []);
    
    const onChange = (event) => {
        setBody(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username){
            setModal(true);
        }
        
        try {
            const response = await api.writeComment(postID, JSON.stringify({body}));
            if (response.status === 201) {
                setBody('');
                setComments([response.data.newComment, ...comments])
            }
            
        } catch(e) {
            console.log(e);
        }
    }
    
    const handleEditSubmit = async (event, isEdit, body) => {
        event.preventDefault();
        
        if (!username){
            setModal(true);
        }
        
        try {
            const response = await api.editComment(isEdit.commentID, JSON.stringify({body}));
            
            if (response.status !== 200) {
                throw(response.data.msg);
            } 
                        
            const response2 = await api.getComment(isEdit.commentID);
            setBody('');
            setEdit({status: false, commentID: null});
            setComments(comments.map(comment => comment.id === isEdit.commentID? response2.data.data : comment));
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
            const response = await api.deleteComment(commentID);

            if (response.status === 202){
                setComments(comments.filter(comment => comment.id !== commentID));
            }
        } catch (e){
            console.log(e);
        }
    }
    
    const handleEdit = async (commentID, commentUsername) => {
        try {
            if (username !== commentUsername){
                alert("해당 댓글을 수정 할 수 없습니다.");
                return;
            }
            const response = await api.getComment(commentID);
            
            if (response.status === 200){
                setEdit({status: true, commentID: commentID});
                setBody(response.data.data.body);
            }
        } catch (e) {
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