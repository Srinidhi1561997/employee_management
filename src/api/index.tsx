import axios from "axios";

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
const employeeApi = axios.create({
    baseURL: "https://628f105c0e69410599d4a59a.mockapi.io",
});

export default employeeApi;