import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const ValidationResult = styled.div`
    font-size: 0.8rem;
    color: red;
`;

const Input = ({icon, iconPosition, placeholder, type, name, value, onChange, isValid, validationMessage = "something"}) => {    
    const color = isValid ? '#5fc963' : '#e67c7c';
    const visibility = isValid !== undefined && !isValid ? 'visible': 'hidden';

    return (
        <div className="field">
            <div className={`control ${iconPosition}`}>
                <input name={name} value={value} onChange={onChange} className="input" type={type} placeholder={placeholder} style={{borderColor: color}}/>
                {icon && 
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={icon} />
                    </span>
                }
                <ValidationResult isValid={isValid} style={{visibility: visibility}}>{validationMessage}</ValidationResult>
            </div>
        </div>
    )
}

export default Input;