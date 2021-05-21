import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';


const NavBar = () => {
    const { username } = useSelector(state => state.user);
    
    return (
        <nav className="navbar is-info">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item" >
                GladiLog
                </Link>
            </div>
            <div className="navbar-menu is-active">
                <div className="navbar-end">
                    <Link to ="/" className="navbar-item">
                        <FontAwesomeIcon icon={faChartBar} />
                    </Link>
                    { username !== null ? 
                        <Link to ="/" className="navbar-item">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </Link> :
                        <Link to ="/auth/signin" className="navbar-item">
                            <FontAwesomeIcon icon={faSignInAlt} />
                        </Link>
                    }

                </div>
            </div>
        </nav>
    );
}

export default NavBar;