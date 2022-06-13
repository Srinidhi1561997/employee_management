import { takeEvery, put, call, StrictEffect, takeLatest } from "redux-saga/effects";
import { actionIds } from "./utils/interface";
import {createEmployeesWorker,deleteEmployeesWorker,getEmployeesWorker, editSpecificEmployeeWorker} from './reducers/sagas'

// watchers
console.log('watcher callker or not')
function* rootSaga(): Generator<StrictEffect> {
    yield takeEvery(actionIds.CREATE_EMPLOYEE, createEmployeesWorker);
    yield takeEvery(actionIds.DELETE_EMPLOYEE, deleteEmployeesWorker);
    yield takeEvery(actionIds.GET_EMPLOYEES, getEmployeesWorker);
    yield takeLatest(actionIds.EDIT_SPECIFIC_EMPLOYEE, editSpecificEmployeeWorker)
}

export default rootSaga