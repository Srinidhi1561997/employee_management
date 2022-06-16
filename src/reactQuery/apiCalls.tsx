import employeeApi from "../api/axiosClient"

export const rqGetEmployees = ()=>{
    return employeeApi.get(`/employee_list`);
}

export const rqDeleteEmployees =(id:string)=>{
    return employeeApi.delete(`/employee_list/${id}`)
}