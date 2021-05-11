import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const NavBar = () => {
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
                    <Link to ="/" className="navbar-item">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;