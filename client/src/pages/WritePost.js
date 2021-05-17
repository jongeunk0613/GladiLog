import React from 'react';
import PostForm from '../components/PostForm';

import * as api from '../lib/api';
import useInputs from '../hooks/useInputs';

const WritePost = ({history}) => {
    const [state, onChange] = useInputs({
        title: '',
        body: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.writePost(JSON.stringify(state));
            
            if (response.status === 201) {
                history.push('/');
            }
        } catch(e) {

        }
    }

    return (
        <PostForm title="제목을 입력하세요" submitButtonName="완료" onChange={onChange} handleSubmit={handleSubmit}/>
    )
}

export default WritePost;