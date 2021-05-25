import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    const { id } = useParams();
    const [body, setBody] = useState('');
    const [isEdit, setEdit] = useState(false);
    const [loading, comments, error, setComments] = usePromise(() => api.getComments(id), []);
    
    const onChange = (event) => {
        setBody(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username){
            setModal(true);
        }
        
        try {
            const response = await api.createComment(id, JSON.stringify({body}));
            if (response.status === 201) {
                setBody('');
                setComments([...comments, response.data.newComment])
            }
            
        } catch(e) {
            console.log(e);
        }
    }
    
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        
        if (!username){
            setModal(true);
        }
        
        try {
            // const response = await 
        } catch(e) {
            console.log(e);
        }
    }
    
    const handleDelete = async (id, commentUsername) => {
        try {
            if (username !== commentUsername){
                alert("해당 댓글을 지울 수 없습니다.");
                return;
            }
            const response = await api.deleteComment(id);

            if (response.status === 202){
                setComments(comments.filter(comment => comment.id != id));
            }
        } catch (e){
            console.log(e);
        }
    }
    
    const handleEdit = async (id) => {
        try {
            const response = await api.getComment(id);
            
            if (response.status === 200){
                setEdit(true);
                setBody(response.data.data.body);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <>
            {modal && <Modal contentTitle="접근 제한" contentBody="로그인이 필요합니다." url="/auth/signin"/>}
            <CommentForm total={comments? comments.length : 0} body={body} onChange={onChange} handleSubmit={handleSubmit} isEdit={isEdit}/>
            <CommentList comments={comments} handleDelete={handleDelete} handleEdit={handleEdit}/>
        </>
    )
}

export default Comment;