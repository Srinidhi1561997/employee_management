import { takeEvery, StrictEffect, takeLatest } from "redux-saga/effects";
import { actionIds } from "./utils/interface";
import {createEmployeesWorker,deleteEmployeesWorker,getEmployeesWorker, editSpecificEmployeeWorker,searchEmployeesWorker} from './reducers/sagas'

// watchers
function* rootSaga(): Generator<StrictEffect> {
    yield takeEvery(actionIds.CREATE_EMPLOYEE, createEmployeesWorker);
    yield takeEvery(actionIds.DELETE_EMPLOYEE, deleteEmployeesWorker);
    yield takeEvery(actionIds.GET_EMPLOYEES, getEmployeesWorker);
    yield takeLatest(actionIds.EDIT_SPECIFIC_EMPLOYEE, editSpecificEmployeeWorker);
    yield takeEvery(actionIds.SEARCH_EMPLOYEES,searchEmployeesWorker);
}

export default rootSaga