import { takeEvery, put, call, StrictEffect } from "redux-saga/effects";
import { actionIds } from "../utils/interface";
import employeeApi from "../api";
import { AxiosResponse } from "axios";
import {
    createdEmployeesAction,
    deletedEmployeesAction,
    gotTodos,
    createEmployeesAction,
    deleteEmployeesAction,
} from "../utils/interface";
import { GetEmployeeAction } from "../screens/employeeDetails/slice/getEmployeeSlice";
import { DeleteEmployeeAction } from "../screens/employeeDetails/slice/deleteEmployeeSlice";
import { CreateEmployeeAction } from "../screens/createEmployee/slice";
import {
    deleteEmployees,
    createEmployees,
    getEmployees
  } from "../reducers/actions"



// workers
const delay = (ms:number) => new Promise(res => setTimeout(res, ms))
function* createEmployeesWorker(employeeDetails: createEmployeesAction) {
    // create todo using api
    // const { data } = employeeDetails;
    console.log('AM i calling or not',employeeDetails.data); 
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
        // switch (response.status) {
        //     case 201:
        //         const data: createdEmployeesAction = {
        //             type: "CREATED_EMPLOYEE",
        //             employee: response.data,
        //         };
        //         yield put(data);
        // }
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
        // switch (response.status) {
        //     case 200:
        //         const data: deletedEmployeesAction = {
        //             type: "DELETED_EMPLOYEE",
        //             employee_id,
        //         };
        //         yield put(data);
        // }
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
        // switch (response.status) {
        //     case 200:
        //         const data: gotTodos = {
        //             type: "GOT_EMPLOYEES",
        //             employees: response.data,
        //         };
                console.log('response is', response)
        //         yield put(data);
        // }
    } catch (err) {
        console.log('error is', err)
        yield put(GetEmployeeAction.get_EmployeesFailure(err))
    }
}

export {createEmployeesWorker, getEmployeesWorker, deleteEmployeesWorker}
