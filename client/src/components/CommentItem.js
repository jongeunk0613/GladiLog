import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-bottom: 1px solid #CDCDCD;
`;

const Header = styled.div`
    display: flex;
    font-size: 0.9rem;
    color: grey;
    
    div {
        margin-right: 0.5rem;
    }
`;

const Author = styled.div`
    font-weight: bold;
    font-size: 1rem;
    color: black;
`;

const Button = styled.div`
    cursor: pointer;
    font-weight: bold;
`;

const Body = styled.div`
    text-align: justify;
`;

const CommentItem = ({comment, handleDelete}) => {
    const { username } = useSelector(state => state.user);
    
    return (
        <CommentContainer>
            <Header>
                <Author>{comment.username}</Author>
                <div>{new Date(comment.created).toLocaleDateString()}</div>
                {username === comment.username && <Button>수정</Button>}
                {username === comment.username && <Button onClick={() => {handleDelete(comment.id, comment.username)}}>삭제</Button>}
            </Header>
            <Body>{comment.body}</Body>
        </CommentContainer>
    );
}

export default CommentItem;