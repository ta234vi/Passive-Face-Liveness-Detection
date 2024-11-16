// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userImageUrl, setUserImageUrl] = useState('');

    return (
        <UserContext.Provider value={{ userImageUrl, setUserImageUrl }}>
            {children}
        </UserContext.Provider>
    );
};
