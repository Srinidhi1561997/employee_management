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

const SearchEmployeeSlice = createSlice({
    name: 'SearchEmployeeSlice',
    initialState,
    reducers: {
        initiate_Search_Employees: (state) => {
            state.isLoading = false
            state.isDelete = false
        },
        search_EmployeesSuccess: (state, action) => {
            state.isLoading = true
            state.employees = action.payload
        },
        search_EmployeesFailure: (state, action) => {
            state.isLoading = false
            state.err=action.payload
        },
        reset_search_Employee:(state) =>{
            state.isLoading= true
            state.employees= []
            state.err={}
            state.success= 0
            state.isDelete=false
        }
    },
})

export const SearchEmployeeAction = SearchEmployeeSlice.actions

export default SearchEmployeeSlice.reducer
