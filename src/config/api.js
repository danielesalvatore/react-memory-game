import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ;
const API_AUTH_TOKEN = process.env.REACT_APP_API_AUTH_TOKEN ;
const API_AUTH_HEADER = process.env.REACT_APP_API_AUTH_HEADER ;

/**
 * Sets the default URL for API Calls
 * and sets fixed headers for JWT Auth
 * @type {[type]}
 */
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json'
    }
});

export const setupInterceptors = () => {

    /**
     * Intercepts every request, before it goes out
     * @param  {[type]} config) {} [description]
     * @return {[type]}         [description]
     */
    axiosInstance.interceptors.request.use(function (config) {

        if (!!API_AUTH_TOKEN) {
            config.headers[API_AUTH_HEADER] = API_AUTH_TOKEN;
        }

        return config
    });


};

setupInterceptors();

export default axiosInstance
