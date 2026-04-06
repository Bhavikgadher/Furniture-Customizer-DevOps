import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider
 *
 * Wraps the app and provides:
 *  - `user`        → the logged-in user object (null if not authenticated)
 *  - `token`       → the JWT token string
 *  - `isAuthenticated` → boolean shortcut
 *  - `login(data)` → stores user + tokens after a successful login API call
 *  - `logout()`    → clears everything and redirects to /login
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    // On mount, try to restore user from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken) {
            setToken(storedToken);
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch {
                    setUser({ authenticated: true });
                }
            } else {
                // Token exists but no user object – still consider authenticated
                setUser({ authenticated: true });
            }
        }
        setIsLoading(false);
    }, []);

    const login = useCallback((data) => {
        // data comes from the login API: { token, refreshToken, user, ... }
        const userData = data.user || data.admin || data;
        const authToken = data.token || localStorage.getItem('token');
        const refreshToken = data.refreshToken;

        if (authToken) localStorage.setItem('token', authToken);
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
        if (userData) localStorage.setItem('user', JSON.stringify(userData));

        setToken(authToken);
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }, []);

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
