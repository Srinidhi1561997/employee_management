import { combineReducers } from '@reduxjs/toolkit'
import GetEmployeeAction from './screens/employeeDetails/slice/getEmployeeSlice'
import CreateEmployeeAction from "./screens/createEmployee/slice"
import DeleteEmployeeAction from './screens/employeeDetails/slice/deleteEmployeeSlice'

const rootReducer = combineReducers({
    employee: GetEmployeeAction,
    createEmployee: CreateEmployeeAction,
    deleteEmployee: DeleteEmployeeAction
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
