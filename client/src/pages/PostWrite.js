import React from 'react';
import PostForm from '../components/PostForm';
import { useHistory } from 'react-router-dom';

import apiCall from '../lib/api';
import { historyPaths } from '../lib/paths';
import useInputs from '../hooks/useInputs';

const PostWrite = () => {
    const history = useHistory();
    const [state, onChange] = useInputs({
        title: '',
        body: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await apiCall('writePost', null, JSON.stringify(state));
            
            if (response.status === 201) {
                history.push(historyPaths.postDetail + response.data.newPostID);
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    const handleCancel = () => {
        history.goBack();
    }

    return (
        <PostForm title="제목을 입력하세요" submitButtonName="완료" onChange={onChange} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
    )
}

export default PostWrite;