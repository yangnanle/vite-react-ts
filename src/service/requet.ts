import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || '/',
    timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 可在此添加 token 等操作
        return config;
    },
    (error) => Promise.reject(error),
);

// 响应拦截器
request.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
);

export default request;
