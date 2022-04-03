import React from 'react';

import AuthNav from './auth-nav';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
       <>
                            <Link to="/">Home</Link> |{" "}
                            <Link to="/recipes">Recipes</Link> |{" "}
                            <Link to="/profile">Profile</Link>
                            <AuthNav />
       </>
    );
};

export default NavBar;
