import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Input = ({icon, iconPosition, placeholder}) => {
    return (
        <div className="field">
            <div className={`control ${iconPosition}`}>
                <input className="input" type="text" placeholder={placeholder}/>
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