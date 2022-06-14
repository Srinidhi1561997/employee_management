import {
    deleteEmployeesActionCreator,
    createEmployeesActionCreator,
    getEmployeesActionCreator,
    editSpecificEmployeesActionCreator,
    searchEmployessActionCreator
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
    return {
        type: "GET_EMPLOYEES",
    };
};

export const editSpecificEmployee: editSpecificEmployeesActionCreator = (employee_id , data) => {
    return {
        type: "EDIT_SPECIFIC_EMPLOYEE",
        employee_id,
        data
    };
};

export const searchEmployees: searchEmployessActionCreator = (searchKey)=>{
    return {
        type: "SEARCH_EMPLOYEES",
        searchKey
    }
}