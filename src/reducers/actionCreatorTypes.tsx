import {
    deleteEmployeesAction,
    createEmployeesAction,
    getEmployees,
    employeeData
} from "../utils/interface";



export type deleteEmployeesActionCreator = (id: string) => deleteEmployeesAction;

export type createEmployeesActionCreator = (data: employeeData) => createEmployeesAction;

export type getEmployeesActionCreator = () => getEmployees;