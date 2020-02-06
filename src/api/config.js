import axios from 'axios';

// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
export const baseUrl = 'http://localhost:3000';

const axiosInstace = axios.create({
    baseURL:baseUrl
});

// response 拦截器,数据返回后进行一些处理
axiosInstace.interceptors.response.use (
    res => res.data,
    err => {
        console.log(err,'网络错误')
    }
);

export {
    axiosInstace
}