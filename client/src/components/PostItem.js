import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { historyPaths } from '../lib/paths';

const Container = styled.div`
    height: 13.5rem;
    padding: 1rem 1rem 2rem 1rem;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Info = styled.div`
    display: flex;
    align-items: center;
`;

const Body = styled.div`
    height: 85%;
    text-align: justify;
    word-wrap: break-word;
    overflow: hidden;
    white-space: normal;
    cursor: pointer;
`;

const VerticalLine = styled.div`
    border-right: 1px solid grey;
    height: 50%;
    margin: 0.5rem;
    color: #CDCDCD;
`;

const PostItem = ({post}) => {
    const history = useHistory();
    const onClick = () => {
        history.push(historyPaths.postDetail + post.id);
    };
    
    return (
        <Container>
            <Top>
                <Title onClick={onClick}>{post.title}</Title>
                <Info>
                    <div>{post.username}</div><VerticalLine/>
                    <div>{(new Date(post.created)).toLocaleDateString()}</div>
                </Info>
            </Top>
            <Body onClick={onClick}>
                {post.body}
            </Body>
            <hr/>
        </Container>
    );
}

export default PostItem;