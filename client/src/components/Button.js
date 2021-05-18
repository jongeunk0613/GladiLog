import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({color, content, helpText, onClick}) => {
    return (
        <div className="field">
            <p className="control">
                <button className={`button ${color}`} style={{marginTop: "0.5rem"}} onClick={onClick}>
                    {content}
                </button>
            </p>
            {helpText && <Link to={`${helpText.toLowerCase()}`} className="help">{helpText}</Link>}
        </div>
    )
}

export default Button;