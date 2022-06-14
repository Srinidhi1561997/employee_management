import axios from "axios";

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
const employeeApi = axios.create({
    baseURL: "https://628f105c0e69410599d4a59a.mockapi.io",
});

// For GET requests
axios.interceptors.request.use(
    (req) => {
       // Add configurations here
       return req;
    },
    (err) => {
       return Promise.reject(err);
    })
    axios.interceptors.response.use(
     (res) => {
        // Add configurations here
        if (res.status === 201) {
           console.log('Posted Successfully');
        }
        return res;
     },
     (err) => {
        return Promise.reject(err);
     }
  );
 
export default employeeApi;