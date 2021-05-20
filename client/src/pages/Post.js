import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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
`;

const Post = ({history}) => {
    const { postID } = useParams();
    return (
        <PostContainer>
            <Header>
                <Title>JAVASCRIPT의 이름은 어떻게 지어졌을 까?</Title>
                <Info>
                    <div>gladi21</div><VerticalLine/>
                    <div>2021/20/21</div><VerticalLine/>
                    <div className="post_button">수정</div><VerticalLine/>
                    <div className="pots_button">삭제</div>
                </Info>
            </Header>
            <Body>
                 미나엄 니아머 ㅇ미나엄 ㄴ이만어 ㅁ니아ㅓㅁ니아먼이 ㅁ나엄닝 ㅓㅁ니ㅏ엄 ㅣ나어미나ㅓㅇ ㅣㅁ나
            </Body>
        </PostContainer>
    );
}

export default Post;