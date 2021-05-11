import React from 'react';
import NavBar from './NavBar';

const Base = ({children}) => {
    return(
        <>
            <NavBar/>
            {children}
        </>
    )
}

export default Base;