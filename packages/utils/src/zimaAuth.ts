import axios from 'axios';

const axiosBaseURL = import.meta.env['VITE_AXIOS_BASE_URL'];
const axiosTimeout: number = import.meta.env['VITE_AXIOS_TIMEOUT'] || 60000;

/**
 * Axios instance for making HTTP requests.
 */
const instance = axios.create({
    baseURL: axiosBaseURL,
    timeout: axiosTimeout,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

instance.interceptors.request.use(
    async (config) => {
        /**
         * The access token retrieved from local storage.
         */
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error?.config;
        /**
         * The refresh token retrieved from local storage.
         */
        const refresh_token = localStorage.getItem("refresh_token");
        // Access Token was expired
        if (originalConfig.url !== "/users/register" && error?.response?.status === 401 && refresh_token) {
            try {
                originalConfig.headers.Authorization = await refreshToken(refresh_token); // 使用refresh_token刷新access_token
                console.log('success originalConfig', originalConfig);
            } catch (e) {
                return maybeUnauthorized(error);
            }
            return instance(originalConfig); // 用新的access_token重新发送请求
        }
        return maybeUnauthorized(error);
    }
);

/**
 * Refreshes the access token using the provided refresh token.
 * @param refresh_token - The refresh token used to obtain a new access token.
 * @returns A Promise that resolves to the new access token.
 */
function refreshToken(refresh_token: string) {
    return axios.post("/v1/users/refresh", { refresh_token })
        .then((tokenRes) => {
            localStorage.setItem("access_token", tokenRes.data.data.access_token);
            localStorage.setItem("refresh_token", tokenRes.data.data.refresh_token);
            localStorage.setItem("expires_at", tokenRes.data.data.expires_at);
            return tokenRes.data.data.access_token;
        }).catch((error) => {
            return Promise.reject(error);
        });

}

/**
 * Rejects the promise with an error indicating unauthorized request.
 * If an error object is provided, its message will be used as the error message.
 * Otherwise, a default error message will be used.
 * @param error - An optional error object.
 * @returns A rejected promise with an error indicating unauthorized request.
 */
function maybeUnauthorized(error: Error | null) {
    let errorMessage = "Unauthorized request, please make sure you have logged in";
    if (error) {
        errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
}

const CancelToken = axios.CancelToken;
// Wrapping of axios by request type
/**
 * API object containing various HTTP request methods.
 */
export const api = {
    /**
     * Sends a GET request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @param _this - Optional reference to the calling object.
     * @returns A Promise that resolves to the response data.
     */
    get(url: string, data?: { [key: string]: any }, _this?: any) {
        if (_this) {
            return instance.get(url, {
                params: data,
                cancelToken: new CancelToken(function executor(c) {
                    _this.cancelRequest = c;
                }),
            });
        } else {
            return instance.get(url, {
                params: data,
            });
        }
    },

    /**
     * Sends a POST request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @param config - Optional configuration for the request.
     * @returns A Promise that resolves to the response data.
     */
    post(url: string, data?: { [key: string]: any }, config?: { [key: string]: any }) {
        return instance.post(url, data, config);
    },

    /**
     * Sends a PUT request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @returns A Promise that resolves to the response data.
     */
    put(url: string, data?: { [key: string]: any }) {
        return instance.put(url, data);
    },

    /**
     * Sends a DELETE request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @returns A Promise that resolves to the response data.
     */
    delete(url: string, data?: { [key: string]: any }) {
        return instance.delete(url, { data: data });
    },

    /**
     * Sends a PATCH request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @returns A Promise that resolves to the response data.
     */
    patch(url: string, data?: { [key: string]: any }) {
        return instance.patch(url, data);
    },
};

/**
 * Returns the instance of ZimaAuth.
 * @returns The instance of ZimaAuth.
 */
export function useZimaAuth() {
    return {
        instance
    }
}
