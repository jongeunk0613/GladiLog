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
    padding: 0.75rem;
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row-reverse;

    div{
        display: flex;
        align-items: center;
        margin-right: 1rem;
    }
`;

const PostForm = ({title, value, body, submitButtonName, onChange, handleSubmit, handleCancel}) => {
    return (
        <FormContainer onSubmit={handleSubmit}>
            <TitleInput name="title" placeholder={title} value={value} onChange={onChange} required/>
            <TextInput name="body" value={body} onChange={onChange} required />
            <Footer>
                <Buttons>
                    <Button color="is-info" content={submitButtonName}/> 
                    <Button color="is-white" content="Cancel" onClick={handleCancel}/>
                </Buttons>
            </Footer>
        </FormContainer>
    )
}

export default PostForm;