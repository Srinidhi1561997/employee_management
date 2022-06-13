import { createSlice } from '@reduxjs/toolkit'
import { initialReducerState } from '../../utils/interface'

const initialState: initialReducerState = {
    isLoading: false,
    employees: [],
    err:{},
    success: 0,
    isDelete:false,
    isEdit: false,
    editUser:{}
}

const EditSpecificEmployeeSlice = createSlice({
    name: 'EditSpecificEmployeeSlice',
    initialState,
    reducers: {
        initiate_Edit_Specific_Employees: (state) => {
            state.isLoading = false
            state.isEdit =false
        },
        edit_Specific_EmployeesSuccess: (state, action) => {
            state.isLoading = true
            state.editUser = action.payload
            state.isEdit = true
        },
        edit_Specific_EmployeesFailure: (state, action) => {
            state.isLoading = false
            state.isEdit = false
            state.err=action.payload
        },
        reset_Edit_Specific_Employee: (state) =>{
            state.isLoading = false
            state.isEdit = false
            state.err={}
        }
    },
})

export const EditSpecificEmployeeAction = EditSpecificEmployeeSlice.actions

export default EditSpecificEmployeeSlice.reducer
