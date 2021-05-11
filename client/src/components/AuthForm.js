import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
`

const StyledAuthForm = styled.form`
    background-color: #ededed;
    width: 600px;
    height: ${props => props.height};
    border-radius: 0.5rem;
    padding: 1.5rem 2rem 1.5rem 2rem;

    @media only screen and (max-width: 600px){
        width: 70%;
    }

    @media only screen and (min-width: 601px) and (max-width: 1500px){
        width: 45%;
    }

    @media only screen and (min-width: 1001px){
        width: 25%;
    }
`;

const AuthForm = ({children, handleSubmit}) => {
    return (
        <FormContainer>
            <StyledAuthForm onSubmit={handleSubmit}>
                {children}
            </StyledAuthForm>
        </FormContainer>
    );
}

export default AuthForm;