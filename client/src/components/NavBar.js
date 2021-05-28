import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';

import apiCall from '../lib/api';
import { historyPaths } from '../lib/paths';
import { clearUsername } from '../modules/user';

const NavBar = () => {
    const { username } = useSelector(state => state.user);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const onLogout = async () => {
        try {
            const response = await apiCall('logout', null, null);
            
            if (response.status === 200){
                dispatch(clearUsername());
                history.go(historyPaths.main);
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <nav className="navbar is-info">
            <div className="navbar-brand">
                <Link to={historyPaths.main} className="navbar-item" >
                GladiLog
                </Link>
            </div>
            <div className="navbar-menu is-active">
                <div className="navbar-end">
                    { username && 
                        <Link to={historyPaths.main} className="navbar-item">
                            { username}
                        </Link>
                    }
                    <Link to ={historyPaths.postWrite} className="navbar-item">
                        <FontAwesomeIcon icon={faChartBar} />
                    </Link>
                    { username !== null ? 
                        <Link to ={historyPaths.main} className="navbar-item" onClick={onLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </Link> :
                        <Link to ={historyPaths.signin} className="navbar-item">
                            <FontAwesomeIcon icon={faSignInAlt} />
                        </Link>
                    }

                </div>
            </div>
        </nav>
    );
}

export default NavBar;