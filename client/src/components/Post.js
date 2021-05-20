import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    border-bottom: 1px solid #CDCDCD;
    padding-bottom: 0.5rem;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const VerticalLine = styled.div`
    border-right: 1px solid grey;
`;

const Info = styled.div`
    display: flex;
    font-size: 1rem;
    color: grey;

    & > div {
        margin: 0.25rem;
    }

    & > div:nth-child(n+5), div:nth-child(n+7){
        cursor: pointer;
    }
`;

const Body = styled.div`
    padding-top: 1rem;
    text-align: left;
    white-space:pre-wrap;
`;

const Post = ({post}) => {
    console.log(post);
    
    return (
        <PostContainer>
            <Header>
                <Title>{post.title}</Title>
                <Info>
                    <div>{post.username}</div><VerticalLine/>
                    <div>{post.created}</div><VerticalLine/>
                    <div className="post_button">수정</div><VerticalLine/>
                    <div className="pots_button">삭제</div>
                </Info>
            </Header>
            <Body>
                 {post.body}
            </Body>
        </PostContainer>
    );
}

export default Post;