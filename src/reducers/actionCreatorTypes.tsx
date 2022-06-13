import {
    deleteEmployeesAction,
    createEmployeesAction,
    getEmployees,
    employeeData,
    editSpecificEmployeeAction
} from "../utils/interface";



export type deleteEmployeesActionCreator = (id: string) => deleteEmployeesAction;

export type createEmployeesActionCreator = (data: employeeData) => createEmployeesAction;

export type getEmployeesActionCreator = () => getEmployees;

export type editSpecificEmployeesActionCreator = (id: string, data:employeeData) => editSpecificEmployeeAction;