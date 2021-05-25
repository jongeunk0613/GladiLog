import React from 'react';
import styled from 'styled-components';

import * as api from '../lib/api';
import PostList from '../components/PostList';
import usePromise from '../hooks/usePromise';

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0rem 0.5rem 0rem 0.5rem;
`;

const HR = styled.hr`
    margin: 0;
`;

const Main = () => {
    const [loading, posts, error] = usePromise(() => api.getPosts(), []);

    if (loading) {
        return <h1>LOADING</h1>
    }
    
    if (error) {
        return <p>{error}</p>
    }
    
    return (
        <>
            <PostHeader>
                <p></p>
                <p>총 : {posts ? posts.length : 0}개</p>
            </PostHeader>
            <HR/>
            {posts && <PostList posts={posts}/>}
        </>
    )
}

export default Main;