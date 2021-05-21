import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';

import * as api from '../lib/api';
import { clearUsername } from '../modules/user';

const NavBar = () => {
    const { username } = useSelector(state => state.user);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const onLogout = async () => {
        try {
            const response = await api.logout();
            
            if (response.status === 200){
                dispatch(clearUsername());
                history.go('/');
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <nav className="navbar is-info">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item" >
                GladiLog
                </Link>
            </div>
            <div className="navbar-menu is-active">
                <div className="navbar-end">
                    { username && 
                        <Link className="navbar-item">
                            { username}
                        </Link>
                    }
                    <Link to ="/" className="navbar-item">
                        <FontAwesomeIcon icon={faChartBar} />
                    </Link>
                    { username !== null ? 
                        <Link to ="/" className="navbar-item" onClick={onLogout}>
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