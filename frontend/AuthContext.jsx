import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);

    // Function to check if the user is authenticated
    const checkAuth = useCallback(async () => {
        // setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/auth/verify", { withCredentials: true });
            console.log(response.data.user);
            setUser(response.data.user); // Store user data in state
        } catch (error) {
            setUser(null); // User is not authenticated
        }
        finally{
            // setLoading(false);
        }
    },[]);

    // Run authentication check when app starts
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <AuthContext.Provider value={{ user, setUser, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access auth context
export const useAuth = () => {
    return useContext(AuthContext);
};