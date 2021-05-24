import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import Button from './Button';

const CommentContainer = styled.form`
    margin: 1.5rem 0rem;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
`;

const Buttons = styled.div`
    display: flex;
`;

const Body = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0rem;

    & > div {
        height: 100%;
    }
`;

const Input = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    margin-right: 1rem;
    border: 1px solid #cdcdcd;
    border-radius: 0.25rem;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
`;

const CommentForm = ({body, onChange, handleSubmit}) => {
    return (
        <CommentContainer>
            <Header>
                <Title>
                    댓글 (3)
                </Title>
                <Buttons>
                    <FontAwesomeIcon icon={faHeart} size="lg"/>
                </Buttons>
            </Header>
            <Body>
                <Input name="body" value={body} onChange={onChange} required/>
                <Button color="is-info" content="댓글달기" nowrap={true} onClick={handleSubmit}/> 
            </Body>
        </CommentContainer>
    );
}

export default CommentForm;