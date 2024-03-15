import axios from "axios";

const axiosBaseURL = ``;

// TODO: 旧的依赖，如果不使用旧的 API，可以删除。
//Create a axios instance, And set timeout to 30s
const instance = axios.create({
    baseURL: axiosBaseURL,
    // one hour.
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

// Interception before request initiation
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Response interception

let isRefreshing = false;
let requests: Array<Function> = [];

function unauthorized(error = null) {
    error && console.warn('unauthorized', error);
    return Promise.reject(
        new Error("Unauthorized request, please make sure you have logged in")
    );
}

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error?.config;
        const refresh_token = localStorage.getItem("refresh_token");
        // Access Token was expired
        if (originalConfig.url !== "/users/register" && error?.response?.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                return instance
                    .post("/v1/users/refresh", { refresh_token: refresh_token })
                    .then((tokenRes) => {
                        if (tokenRes.data.success == 200) {
                            localStorage.setItem(
                                "access_token",
                                tokenRes.data.data.access_token
                            );
                            localStorage.setItem(
                                "refresh_token",
                                tokenRes.data.data.refresh_token
                            );
                            localStorage.setItem("expires_at", tokenRes.data.data.expires_at);
                            originalConfig.headers.Authorization = tokenRes.data.data.access_token;
                            instance.defaults.headers.Authorization = tokenRes.data.data.access_token;
                            isRefreshing = false;
                            return tokenRes.data.data.access_token;
                        } else {
                            return unauthorized();
                        }
                    })
                    .then((token) => {
                        requests.forEach((cb) => typeof cb === 'function' && cb(token));
                        requests = [];
                    })
                    .catch((error) => {
                        return unauthorized(error);
                    });
            } else if (originalConfig.url === "/v1/users/refresh" && error?.response?.status === 401) {
                return unauthorized();
            }
            return new Promise((resolve) => {
                requests.push((token: String) => {
                    originalConfig.headers = {};
                    originalConfig.headers.Authorization = token;
                    resolve(instance(originalConfig));
                });
            });
        }
        return Promise.reject(error);
    }
);

const CancelToken = axios.CancelToken;
// Wrapping of axios by request type
export const api = {
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
    post(url: string, data?: { [key: string]: any }, config?: { [key: string]: any }) {
        return instance.post(url, data, config);
    },
    put(url: string, data?: { [key: string]: any }) {
        return instance.put(url, data);
    },
    delete(url: string, data?: { [key: string]: any }) {
        return instance.delete(url, { data: data });
    },
    patch(url: string, data?: { [key: string]: any }) {
        return instance.patch(url, data);
    },
};

export const useInstance = () => {
    return instance;
}

