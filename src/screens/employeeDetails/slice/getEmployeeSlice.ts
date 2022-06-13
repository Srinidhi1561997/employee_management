import { createSlice } from '@reduxjs/toolkit'
import { initialReducerState } from '../../../utils/interface'

const initialState: initialReducerState = {
    isLoading: false,
    employees: [],
    err:{},
    success: 0,
    isDelete:false,
    editUser:{},
    isEdit: false
}

const GetEmployeeSlice = createSlice({
    name: 'GetEmployeeSlice',
    initialState,
    reducers: {
        initiate_Get_Employees: (state) => {
            state.isLoading = true
        },
        get_EmployeesSuccess: (state, action) => {
            state.isLoading = false
            state.employees = action.payload
        },
        get_EmployeesFailure: (state, action) => {
            state.isLoading = false
            state.err=action.payload
        },
    },
})

export const GetEmployeeAction = GetEmployeeSlice.actions

export default GetEmployeeSlice.reducer
