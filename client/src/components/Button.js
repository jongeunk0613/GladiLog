import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const type = {
    "is-info": {
        "background": "#3e8ed0",
        "color": "#fff"
    },
    "is-success": {
        "background": "#48c78e",
        "color": "#fff"
    },
    "is-white": {
        "background": "#fff",
        "color": "##0a0a0a"
    }
}

const ButtonContainer = styled.div`
    cursor: pointer;
`;

const StyledButton = styled.button`
    cursor: pointer;
    background-color: ${props => type[props.type]["background"]};
    color: ${props => type[props.type]["color"]};
    border-color: transparent;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    white-space: ${props => props.nowrap? "nowrap": "normal"};
`

const Button = ({color, content, helpText, helpTextUrl, onClick, nowrap = false}) => {
    return (
        <ButtonContainer>
            <StyledButton onClick={onClick} type={color} nowrap={nowrap}>
                {content}
            </StyledButton>
            {helpText && <Link to={helpTextUrl} className="help">{helpText}</Link>}
        </ButtonContainer>
    )
}

export default Button;