'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User } from '@/lib/types';
import { mockLogin, saveToken, removeToken, getToken, getUserFromToken } from '@/lib/auth';

const AuthContext = createContext<AuthState | undefined>(undefined);

// hook to access uth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth was called outside of <AuthProvider>');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // check if a valid token exists and sets the user accordingly
    useEffect(() => {
        const token = getToken();
        if (token) {
            const userData = getUserFromToken(token);
            if (userData) {
                setUser(userData);
            } else {
                removeToken(); //iInvalid or expired token
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const userData = await mockLogin(username, password);
            if (userData) {
                setUser(userData);
                saveToken(userData.token); // save token to localStorage
                return true;
            }
            return false;
        } catch (error) {
            console.error('login error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // clears user state and removes token on logout
    const logout = () => {
        setUser(null);
        removeToken();
    };

    // context value passed
    const value: AuthState = {
        user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
