import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Unique key to avoid collisions with other apps on localhost
    const STORAGE_KEY = 'fullstack_auth_app_v1_user';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem(STORAGE_KEY);
                if (storedUser) {
                    try {
                        const userInfo = JSON.parse(storedUser);
                        // Basic validation to ensure it's an object with a token
                        if (userInfo && userInfo.token) {
                            setUser(userInfo);
                        } else {
                             console.warn("Invalid user info structure, clearing storage");
                             localStorage.removeItem(STORAGE_KEY);
                        }
                    } catch (parseError) {
                        console.error("Error parsing stored user info:", parseError);
                        localStorage.removeItem(STORAGE_KEY); // Clear invalid data
                    }
                }
            } catch (e) {
                console.error("Error accessing local storage:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post('/api/users/login', { email, password }, config);

            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post('/api/users', { name, email, password }, config);

            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            };
        }
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
