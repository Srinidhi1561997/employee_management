import { createSlice } from '@reduxjs/toolkit'
import { initialReducerState } from '../../utils/interface'

const initialState: initialReducerState = {
    isLoading: false,
    employees: [],
    success: 0,
    err:{},
    isDelete: false
}

const CreateEmployeeSlice = createSlice({
    name: 'CreateEmployeeSlice',
    initialState,
    reducers: {
        initiate_Create_Employee: (state) => {
            state.isLoading = false
        },
        create_EmployeesSuccess: (state, action) => {
            state.isLoading = true
            state.success = action.payload
            // state.employees = action.payload
        },
        create_EmployeesFailure: (state, action) => {
            state.isLoading = false
            state.err=action.payload
        },
        reset_create_Employee:(state)=>{
            state.isLoading = false
            state.success= 0
            state.err={}
        }
    },
})

export const CreateEmployeeAction = CreateEmployeeSlice.actions

export default CreateEmployeeSlice.reducer
