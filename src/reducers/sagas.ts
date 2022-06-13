import {  put, call } from "redux-saga/effects";
import employeeApi from "../api";
import { AxiosResponse } from "axios";
import {
    editSpecificEmployeeAction,
    createEmployeesAction,
    deleteEmployeesAction,
} from "../utils/interface";
import { GetEmployeeAction } from "../screens/employeeDetails/slice/getEmployeeSlice";
import { DeleteEmployeeAction } from "../screens/employeeDetails/slice/deleteEmployeeSlice";
import { CreateEmployeeAction } from "../screens/createEmployee/slice";
import { EditSpecificEmployeeAction } from "../screens/updateEmployee/slice";

// workers
const delay = (ms:number) => new Promise(res => setTimeout(res, ms))
function* createEmployeesWorker(employeeDetails: createEmployeesAction) {
    yield put(CreateEmployeeAction.initiate_Create_Employee());       
    try {
        const response: AxiosResponse =  yield call(employeeApi.post, "/employee_list", employeeDetails.data);
        if(response?.status===201){
             console.log('called post api', response)
             yield put(CreateEmployeeAction.create_EmployeesSuccess(response.status))
             yield delay(1500);
             yield put(CreateEmployeeAction.reset_create_Employee());
        return response;    
        }
    } catch (err) {
        console.log('error is', err)
        yield put(CreateEmployeeAction.create_EmployeesFailure(err))
    }
    // update our redux store by dispatching a new action
}

function* deleteEmployeesWorker({ employee_id }: deleteEmployeesAction) {
    yield put(DeleteEmployeeAction.initiate_Delete_Employees());
    try {
        const response: AxiosResponse = yield call(employeeApi.delete, `/employee_list/${employee_id}`);
        console.log('delete user success', response)
        if(response?.status===200){
            yield put(DeleteEmployeeAction.delete_EmployeesSuccess(response.status))
             yield delay(1500);
             yield put(DeleteEmployeeAction.reset_delete_Employee());
        }
    } catch (err) {
        console.log('error deleteing user is', err)
        yield put(DeleteEmployeeAction.delete_EmployeesFailure(err))
     }
}


function* getEmployeesWorker() {
    yield put(GetEmployeeAction.initiate_Get_Employees());

    try {
        const response: AxiosResponse = yield call(employeeApi.get, "/employee_list");
        if(response?.status===200){
            yield put(GetEmployeeAction.get_EmployeesSuccess(response.data))
        }
    } catch (err) {
        console.log('error is', err)
        yield put(GetEmployeeAction.get_EmployeesFailure(err))
    }
}

function* editSpecificEmployeeWorker({employee_id,data}:editSpecificEmployeeAction) {
    const editedData = {
        designation: data.designation,
        email: data.email,
        first_name: data.first_name,
        gender: data.gender,
        last_name: data.last_name,
        office_location: data.office_location,
    }
    yield put(EditSpecificEmployeeAction.initiate_Edit_Specific_Employees());
    console.log('edited values are', data)
    try {
        const response: AxiosResponse = yield call(employeeApi.put, `/employee_list/${employee_id}`,editedData);
        if(response?.status===200){
            yield put(EditSpecificEmployeeAction.edit_Specific_EmployeesSuccess(response.data))
            yield delay(2000)
            yield put(EditSpecificEmployeeAction.reset_Edit_Specific_Employee())
        }
    } catch (err) {
        console.log('error is', err)
        yield put(EditSpecificEmployeeAction.edit_Specific_EmployeesFailure(err))
    }
}

export {createEmployeesWorker, getEmployeesWorker, deleteEmployeesWorker, editSpecificEmployeeWorker}
