import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

interface User {
    _id: string;
    fullName: string;
    email: string;
    roles: any[];
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email: string, password: string) => {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method : 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({email, password}),
        });

        if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(true);
            localStorage.setItem('token', data.data.token);
            setToken(data.data.token);
        } else {
            setError("Failed to login");
        }
    };

    const getUser = async () => {
        const response = await fetch('http://localhost:3000/api/v1/users/me', {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token ? token : localStorage.getItem('token')}`,
            }
        })
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.data));
            setUser(data.data);
        } else {
            setError(`${data.message}`)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            getUser().then()
        }
    }, []);

    return (<AuthContext.Provider value={{user, error, isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>);
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};