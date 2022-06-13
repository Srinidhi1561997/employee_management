import { createSlice } from '@reduxjs/toolkit'
import { initialReducerState } from '../../../utils/interface'

const initialState: initialReducerState = {
    isLoading: true,
    employees: [],
    err:{},
    success: 0,
    isDelete:false,
    editUser:{},
    isEdit: false
}

const DeleteEmployeeSlice = createSlice({
    name: 'DeleteEmployeeSlice',
    initialState,
    reducers: {
        initiate_Delete_Employees: (state) => {
            state.isLoading = false
            state.isDelete = false
        },
        delete_EmployeesSuccess: (state, action) => {
            state.isLoading = true
            state.isDelete = true
            state.success = action.payload
        },
        delete_EmployeesFailure: (state, action) => {
            state.isLoading = false
            state.err=action.payload
        },
        reset_delete_Employee:(state) =>{
            state.isLoading= true
            state.employees= []
            state.err={}
            state.success= 0
            state.isDelete=false
        }
    },
})

export const DeleteEmployeeAction = DeleteEmployeeSlice.actions

export default DeleteEmployeeSlice.reducer
