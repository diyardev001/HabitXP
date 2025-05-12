import React, {createContext, useContext, useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import {router, useSegments} from "expo-router";
import api from "@/lib/api";
import {AuthContextType, User} from "@/types/auth";
import {ROUTES} from "@/routes";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const segments = useSegments();


    useEffect(() => {
        const loadSession = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync('token');
                if (storedToken) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    const res = await api.get('/user/profile');
                    setUser(res.data);
                    setToken(storedToken);
                }
            } catch (err: any) {
                console.log("Session-Check fehlgeschlagen", err.message);
                await logout()
            } finally {
                setIsLoading(false);
            }
        };
        loadSession();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const inAuthGroup = segments[0]?.startsWith("(auth)");
            if (!token && !inAuthGroup) {
                router.replace(ROUTES.LOGIN);
            } else if (token && inAuthGroup) {
                router.replace(ROUTES.DASHBOARD);
            }
        }
    }, [token, segments, isLoading]);

    const login = async (email: string, password: string) => {
        // "username": "test",
        // "email": "te@example.com",
        // "password": "1234"

        try {
            const res = await api.post('/auth/login', {email, password});
            const jwt = res.data.token;
            await SecureStore.setItemAsync('token', jwt);
            api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            setUser(res.data.user);
            setToken(jwt);
        } catch (error: any) {
            console.log("Login fehlgeschlagen:", error.response?.data || error.message);
            throw error;
        }
    };

    const register = async (username: string, email: string, password: string) => {
        const res = await api.post('/auth/register', {username, email, password});
        const jwt = res.data.token;
        await SecureStore.setItemAsync('token', jwt);
        api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        const profile = await api.get("/user/profile");
        setUser(profile.data);
        setToken(jwt);
        router.replace(ROUTES.DASHBOARD);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        setUser(null);
        setToken(null);
        router.replace(ROUTES.LOGIN);
    };

    return (
        <AuthContext.Provider value={{user, token, login, register, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};