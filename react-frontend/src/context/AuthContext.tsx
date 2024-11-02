// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import TokenService from '../services/token.service';

interface User {
    data: {
        accessToken: string;
        name: string;
    };
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => TokenService.getUser());

    useEffect(() => {
        const storedUser = TokenService.getUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData: User) => {
        TokenService.setUser(userData);
        setUser(userData);
    };

    const logout = () => {
        TokenService.removeUser();
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!TokenService.getLocalAccessToken();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
