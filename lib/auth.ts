import { User } from './types';

const DEMO_CREDENTIALS = {
    username: 'demo',
    password: 'demo',
};

// generate fake token
const generateToken = (username: string): string => {
    const tokenPayload = {
        username,
        id: 1,
        expireAt: Date.now() + 24 * 60 * 60 * 1000, // valid for 1 day
    };

    return btoa(JSON.stringify(tokenPayload));
};

// check token validity
const validateToken = (token: string): boolean => {
    try {
        const tokenPayload = JSON.parse(atob(token));
        return tokenPayload.expireAt > Date.now();
    } catch {
        return false;
    }
};

// mock login check
export const mockLogin = async (username: string, password: string): Promise<User | null> => {
    // loading simulate here
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        const token = generateToken(username);
        const user: User = {
            id: 1,
            username,
            token,
        };
        return user;
    }

    return null;
};

// save token in local storage
export const saveToken = (token: string): void => {
    localStorage.setItem('mock_auth_token', token);
};

// get token from local storage
export const getToken = (): string | null => {
    return localStorage.getItem('mock_auth_token');
};

// remove token from local storage
export const removeToken = (): void => {
    localStorage.removeItem('mock_auth_token');
};

// token decoding for user info
export const getUserFromToken = (token: string): User | null => {
    try {
        if (!validateToken(token)) {
            return null;
        }

        const tokenPayload = JSON.parse(atob(token));
        return {
            id: tokenPayload.id,
            username: tokenPayload.username,
            token,
        };
    } catch {
        return null;
    }
};

// auth check
export const isAuthenticated = (): boolean => {
    const hasToken = getToken();
    return hasToken ? validateToken(hasToken) : false;
};
