import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 80vh;
    margin-top: 4rem;
`

const StyledAuthForm = styled.form`
    background-color: #ededed;
    width: 600px;
    height: ${props => props.height};
    border-radius: 0.5rem;
    padding: 2rem 2rem 0rem 2rem;

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

const AuthForm = ({children, handleSubmit, height}) => {
    return (
        <FormContainer>
            <StyledAuthForm onSubmit={handleSubmit} height={height}>
                {children}
            </StyledAuthForm>
        </FormContainer>
    );
}

export default AuthForm;