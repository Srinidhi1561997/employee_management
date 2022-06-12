export const GET_EMPLOYEES = 'GET_EMPLOYEES'
export const GET_EMPLOYEE_BY_ID = 'GET_EMPLOYEES_BY_ID'
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const UPDATE_EMPLOYEE_BY_ID = 'UPDATE_EMPLOYEE_BY_ID'
export const DELETE_EMPLOYEE_BY_ID = 'DELETE_EMPLOYEE_BY_ID'
export const randomNumber = `${(Math.floor(Math.random() * 9000000000) + 1).toString().slice(-2)}-`.concat(`${Math.floor(Math.random() * 90000000) + 1}`)