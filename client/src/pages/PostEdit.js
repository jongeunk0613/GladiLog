import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import * as api from '../lib/api';
import PostForm from '../components/PostForm';

const PostEdit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        title: '',
        body: ''
    });
    
    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try{
                const resolved = await api.getPost(id);
                setState(resolved.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        process();
    }, [id]);
    
    if (loading) {
        return <h1> LOADING </h1>
    }
    
    if (error) {
        return <p>{error}</p>
    }
    
    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }
    
    const handleCancel = () => {
        history.goBack();
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await api.updatePost(id, JSON.stringify(state));
            
            if (response.status === 200) {
                history.push(`/post/${id}`);
            }
        } catch(e) {
            console.log(e);
        }
        
    }
    
    return (
        <>
            {!loading && <PostForm title="Post Title" value={state.title} body={state.body} submitButtonName="Save" onChange={onChange} handleCancel={handleCancel} handleSubmit={handleSubmit}/>}
        </>
    )
}

export default PostEdit;