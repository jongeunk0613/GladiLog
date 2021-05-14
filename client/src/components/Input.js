import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Input = ({icon, iconPosition, placeholder, type, name, value, onChange}) => {
    return (
        <div className="field">
            <div className={`control ${iconPosition}`}>
                <input name={name} value={value} onChange={onChange} className="input" type={type} placeholder={placeholder}/>
                {icon && 
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={icon} />
                    </span>
                }
            </div>
        </div>
    )
}

export default Input;