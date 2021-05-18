import React from 'react';
import styled from 'styled-components';

import PostList from '../components/PostList';

const posts = [
    {
        id: 1,
        title: 'TITLE 1',
        body: 'hello everybody nice to mice youuu. I am making a blog application using flask and react. It is my first time using these frameworks. ',
        created: '2021/02/32',
    },
    {
        id: 2,
        title: 'TITLE 2',
        body: 'BODY 2',
        created: '2021/02/32',
    },
    {
        id: 3,
        title: 'TITLE 3',
        body: 'BODY 3',
        created: '2021/02/32',
    },{
        id: 4,
        title: 'TITLE 2',
        body: 'BODY 2',
        created: '2021/02/32',
    },
    {
        id: 5,
        title: 'TITLE 3',
        body: 'BODY 3',
        created: '2021/02/32',
    }
];

const Main = () => {
    return (
        <>
            <PostList posts={posts}/>
        </>
    )
}

export default Main;