import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 14rem;
    padding: 1rem 1rem 2rem 1rem;
    cursor: pointer;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 1.5rem;
`;

const Date = styled.div`

`;

const Body = styled.div`
    height: 85%;
    text-align: justify;
    word-wrap: break-word;
    overflow: hidden;
    white-space: normal;
`;

const PostItem = ({post, history}) => {
    const onClick = () => {
        history.push(`/post/${post.id}`)
    }
    
    return (
        <Container onClick={onClick}>
            <Top>
                <Title>{post.title}</Title>
                <Date>{post.created}</Date>
            </Top>
            <Body>
                {post.body}
            </Body>
            <hr/>
        </Container>
    );
}

export default PostItem;