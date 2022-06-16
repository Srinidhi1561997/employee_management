import axios from "axios";

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
const employeeApi = axios.create({
    baseURL: "https://628f105c0e69410599d4a59a.mockapi.io",
});








// Interceptors
// employeeApi.interceptors.request.use(function (config: AxiosRequestConfig) {
//    // Do something before request is sent
//    return config;
//  }, function (error) {
//    // Do something with request error
//    return Promise.reject(error);
//  });
 
//  // Add a response interceptor
//  employeeApi.interceptors.response.use(function (response: AxiosResponse) {
//    // Any status code that lie within the range of 2xx cause this function to trigger
//    // Do something with response data
//    return response.data;
//  }, function (error) {
//    // Any status codes that falls outside the range of 2xx cause this function to trigger
//    // Do something with response error
//    return Promise.reject(error);
//  });
 
export default employeeApi;