import * as yup from 'yup'

 const schema = yup
    .object({
        first_name: yup.string().required("first name is required").min(3,"first name must be atleast 3 characters").max(20," first name should not exceed more than 20 characters").matches(/^[A-Za-z_ ]+$/i,"first name should contain only character"),
        last_name: yup.string().required("last name is required").min(3, "last name must be atleast 3 characters").max(20, "last name should not exceed more than 20 characters").matches(/^[A-Za-z_ ]+$/i, "last name should contain only character"),
        designation: yup.string().required("designation is required").min(5,"designation must be atleast 5 characters").max(50,"designation should not exceed more than 50 characters").matches(/^[A-Za-z0-9_ ]+$/i, "splecial characters are not allowed"),
        email: yup.string().required("email is required").min(10,"email must be atleast 10 characters").max(60, "email should not exceed more than 60 characters").matches(/^([a-zA-Z0-9]+)([\{1}])?[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "invalid email format"),
        gender: yup.string().required(),
        office_location: yup.string().required("office location is required").min(5,"office location must be atleast 5 characters").max(200,"office address should not exceed more than 200 characters").matches(/^[A-Za-z0-9 !@#$%^&*,.)(/]+$/i,"invalid address"),
        employee_id: yup.string().required(),
        emp_actions: yup.number()
    })
    .required()

    export default schema