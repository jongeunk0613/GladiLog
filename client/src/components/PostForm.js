import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const FormContainer = styled.form`
    height: 80vh;
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid #CDCDCD;
    margin-bottom: 1rem;
    width: 100%;
`;

const TextInput = styled.textarea`
    font-size: 1rem;
    width: 100%;
    height: 90%;
    padding: 1.5rem;
    border: none;
    outline: none;
`;

const Footer = styled.footer`
    position: fixed;
    bottom: 0px;
    left: 0px;
    background: #f2f2f2;
    width: 100vw;
    heigth: 15vh;

    div {
        padding-top: auto;
        padding-bottom: auto;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        margin-right: 1.5rem;
    }
`

const PostForm = ({title, value, body, submitButtonName, onChange, handleSubmit, history}) => {
    return (
        <FormContainer onSubmit={handleSubmit}>
            <TitleInput name="title" placeholder={title} value={value} onChange={onChange} required/>
            <TextInput name="body" onChange={onChange} required>{body}</TextInput>
            <Footer>
                <div>
                    <Button color="is-info" content={submitButtonName}/> 
                    <Button color="is-white" content="Cancel" onClick={() => history.goBack()}/>
                </div>
            </Footer>
        </FormContainer>
    )
}

export default PostForm;