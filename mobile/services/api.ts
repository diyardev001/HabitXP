import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";
import {ROUTES} from "@/routes";

let currentAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    currentAccessToken = token;
};

const api = axios.create({
    baseURL: Constants.expoConfig?.extra?.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (currentAccessToken) {
            config.headers.Authorization = `Bearer ${currentAccessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = await SecureStore.getItemAsync('refreshToken');
                if (!refreshToken) throw new Error("Kein Refresh Token vorhanden");

                const res = await axios.post(`${Constants.expoConfig?.extra?.API_URL}/auth/refresh`, {
                    refreshToken,
                });

                const {accessToken, refreshToken: newRefreshToken} = res.data;

                await Promise.all([
                    SecureStore.setItemAsync("accessToken", accessToken),
                    SecureStore.setItemAsync("refreshToken", newRefreshToken),
                ]);

                setAccessToken(accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError: unknown) {
                console.log("Token refresh fehlgeschlagen", refreshError);

                await SecureStore.deleteItemAsync("accessToken");
                await SecureStore.deleteItemAsync("refreshToken");

                router.replace(ROUTES.LOGIN);

                const error = refreshError instanceof Error
                    ? refreshError
                    : new Error("Unbekannter Fehler beim Token-Refresh");

                return Promise.reject(error);
            }
        }

        return Promise.reject(
            error instanceof Error ? error : new Error("Unbekannter API-Fehler")
        );
    }
);

export default api;