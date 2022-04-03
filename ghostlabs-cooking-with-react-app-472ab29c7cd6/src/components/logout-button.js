import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();
    const LOCAL_STORAGE_KEY = 'cookingWithReact.app.recipes'
    function clearStorage() {
        console.log('clearStorage')
        localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    return (
        <button
            className="btn btn--danger btn-block"
            onClick={() =>{
                clearStorage()
                logout({
                    returnTo: window.location.origin,
                })}
            }
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
