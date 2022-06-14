import {
    deleteEmployeesAction,
    createEmployeesAction,
    getEmployees,
    employeeData,
    editSpecificEmployeeAction,
    searchEmployeesAction
} from "../utils/interface";



export type deleteEmployeesActionCreator = (id: string) => deleteEmployeesAction;

export type createEmployeesActionCreator = (data: employeeData) => createEmployeesAction;

export type getEmployeesActionCreator = () => getEmployees;

export type editSpecificEmployeesActionCreator = (id: string, data:employeeData) => editSpecificEmployeeAction;

export type searchEmployessActionCreator = (searchKey: string) => searchEmployeesAction;
