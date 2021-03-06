
export type employeeData = {
    designation: string
    email: string
    employee_id: string
    first_name: string
    gender: string
    last_name: string
    office_location: string
    emp_actions: number
    id: string
}
export interface initialReducerState {
    isLoading: boolean
    employees: employeeData[]
    err:object
    success: number
    isDelete: boolean
    isEdit: boolean
    editUser: object}


// For Action Creator
export interface deleteEmployeesAction {
    type: "DELETE_EMPLOYEE";
    employee_id: string;
}

export interface editSpecificEmployeeAction {
    type: "EDIT_SPECIFIC_EMPLOYEE"
    employee_id: string;
    data:employeeData;
}

export interface createEmployeesAction {
    type: "CREATE_EMPLOYEE";
    data: employeeData
}

export interface getEmployees {
    type: "GET_EMPLOYEES";
}

export interface searchEmployeesAction {
    type: "SEARCH_EMPLOYEES";
    searchKey: string
}

export const actionIds = {
    DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
    CREATE_EMPLOYEE: "CREATE_EMPLOYEE",
    GET_EMPLOYEES: "GET_EMPLOYEES",
    EDIT_SPECIFIC_EMPLOYEE: "EDIT_SPECIFIC_EMPLOYEE",
    SEARCH_EMPLOYEES : "SEARCH_EMPLOYEES"
};

export interface IFormInput {
    designation: string
    email: string
    employee_id: string
    first_name: string
    gender: string
    last_name: string
    office_location: string
    emp_actions: number
    id: string
}

export type Data = {
    designation: string
    email: string
    employee_id: string
    first_name: string
    gender: string
    last_name: string
    office_location: string
    emp_actions: number
    id:string
}

export interface HeadCell {
    id: keyof Data;
    label: string;
}

export type iAppHeader ={
    headerName:string
}

export type ilazyLoader = {
    loading: boolean
}

// export type drawerScreen = {
//     openDrawer: boolean
//     setOpenDrawer: object
//     editUser: IFormInput
// }

export type searchBar = {
    searchKeyTerm :boolean
}