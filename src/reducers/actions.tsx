import {
    deleteEmployeesActionCreator,
    createEmployeesActionCreator,
    getEmployeesActionCreator,
} from "./actionCreatorTypes";


export const deleteEmployees: deleteEmployeesActionCreator = (employee_id) => {
    return {
        type: "DELETE_EMPLOYEE",
        employee_id,
    };
};

export const createEmployees: createEmployeesActionCreator = (data) => {
    return {
        type: "CREATE_EMPLOYEE",
        data,
    };
};

export const getEmployees: getEmployeesActionCreator = () => {
    console.log('getEmployess called')
    return {
        type: "GET_EMPLOYEES",
    };
};