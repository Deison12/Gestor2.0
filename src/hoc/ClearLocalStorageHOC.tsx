import React from 'react';
import { useLocation, NavigateFunction } from 'react-router-dom';

interface Content {
    children: JSX.Element;
    navigate: NavigateFunction;
}

const ClearLocalStorageHOC: React.FC<Content> = ({ children, navigate }) => {
    const location = useLocation();

    // List of URLs to clear localStorage
    const urlsToClear = ['/specific-url1', '/specific-url2'];

    if (urlsToClear.includes(location.pathname)) {
        localStorage.removeItem('selectedId');
        // Navigate if needed
        navigate('/other-link');
    }

    return <>{children}</>;
};

export default ClearLocalStorageHOC;
