import React from 'react';
import NavBar from './NavBar';
import styled from 'styled-components';

const BodyContainer = styled.div`
    padding: 2rem 4rem 3rem 4rem;
`;

const Base = ({children}) => {
    return(
        <>
            <NavBar/>
            <BodyContainer>
                {children}
            </BodyContainer>
        </>
    )
}

export default Base;