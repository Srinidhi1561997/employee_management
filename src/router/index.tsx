import { useRoutes } from 'react-router-dom'
import EmployeeDetails from '../screens/employeeDetails'
import CreateEmployee from '../screens/createEmployee'
import UpdateEmployee from '../screens/updateEmployee'

const AppRoutes = () => {
    const routes = useRoutes([
        { path: '/', element: <EmployeeDetails /> },
        { path: '/create-employee', element: <CreateEmployee /> },
        { path: '/update-employee', element: <UpdateEmployee /> },
    ])
    return routes
}

export default AppRoutes