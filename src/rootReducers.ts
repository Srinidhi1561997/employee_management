import { combineReducers } from '@reduxjs/toolkit'
import GetEmployeeAction from './screens/employeeDetails/slice/getEmployeeSlice'
import CreateEmployeeAction from "./screens/createEmployee/slice"
import DeleteEmployeeAction from './screens/employeeDetails/slice/deleteEmployeeSlice'
import EditSpecificEmployeeAction from './screens/updateEmployee/slice'
import SearchEmployeeSlice from './screens/employeeDetails/slice/searchEmployeeSlice'

const rootReducer = combineReducers({
    employee: GetEmployeeAction,
    createEmployee: CreateEmployeeAction,
    deleteEmployee: DeleteEmployeeAction,
    editUserData: EditSpecificEmployeeAction,
    searchEmployee: SearchEmployeeSlice
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
