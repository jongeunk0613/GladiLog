import React from 'react';
import styled from 'styled-components';

import * as api from '../lib/api';
import PostList from '../components/PostList';
import usePromise from '../hooks/usePromise';


const Main = () => {
    const [loading, posts, error] = usePromise(() => api.getPosts(), []);

    if (loading) {
        return <h1>LOADING</h1>
    }
    
    return (
        <>
            {posts && <PostList posts={posts}/>}
        </>
    )
}

export default Main;