/**
 * API object containing various HTTP request methods.
 */
export declare const api: {
    /**
     * Sends a GET request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @param _this - Optional reference to the calling object.
     * @returns A Promise that resolves to the response data.
     */
    get(url: string, data?: {
        [key: string]: any;
    }, _this?: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Sends a POST request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @param config - Optional configuration for the request.
     * @returns A Promise that resolves to the response data.
     */
    post(url: string, data?: {
        [key: string]: any;
    }, config?: {
        [key: string]: any;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Sends a PUT request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @returns A Promise that resolves to the response data.
     */
    put(url: string, data?: {
        [key: string]: any;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Sends a DELETE request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @returns A Promise that resolves to the response data.
     */
    delete(url: string, data?: {
        [key: string]: any;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Sends a PATCH request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - Optional data to be sent with the request.
     * @returns A Promise that resolves to the response data.
     */
    patch(url: string, data?: {
        [key: string]: any;
    }): Promise<import("axios").AxiosResponse<any, any>>;
};
/**
 * Returns the instance of ZimaAuth.
 * @returns The instance of ZimaAuth.
 */
export declare function useZimaAuth(): {
    instance: import("axios").AxiosInstance;
};
