import { employeeData } from "./utils/interface";
import {
    deleteEmployeesActionCreator,
    createEmployeesActionCreator,
    getEmployeesActionCreator,
} from "./reducers/actionCreatorTypes";

interface AppPropType {
    employees: employeeData[];
    deleteEmployees: deleteEmployeesActionCreator;
    createEmployees: createEmployeesActionCreator;
    getEmployees: getEmployeesActionCreator;
}

export default AppPropType;