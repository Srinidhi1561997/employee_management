import React, { useEffect } from 'react'
import { takeEvery, put, call, StrictEffect } from "redux-saga/effects";
// import { useLocation } from 'react-router-dom'
import { useForm, SubmitHandler, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MenuItem, Select } from '@mui/material'
import AppHeader from '../../components/appBar'
import Styles from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { editSpecificEmployee } from '../../reducers/actions'
import * as Constants from '../../utils/constants'
import { useNavigate, useLocation } from 'react-router-dom'
import { employeeData } from '../../utils/interface';
import SnackbarMessage from '../../components/snackbar';
import DelayingAppearance from "../../components/circularProgressBar"
// import { GET_EMPLOYEES } from '../App/reduxTypes'

const schema = yup
    .object({
        first_name: yup.string().required("frst name is required").min(3,"first name must be atleast 3 characters").max(20," first name should not exceed more than 20 characters").matches(/^[A-Za-z_ ]+$/i,"first name should contain only character"),
        last_name: yup.string().required("last name is required").min(3, "last name must be atleast 3 characters").max(20, "last name should not exceed more than 20 characters").matches(/^[A-Za-z_ ]+$/i, "last name should contain only character"),
        designation: yup.string().required("designation is required").min(5,"designation must be atleast 5 characters").max(50,"designation should not exceed more than 50 characters").matches(/^[A-Za-z0-9_ ]+$/i, "splecial characters are not allowed"),
        email: yup.string().required("email is required").min(10,"email must be atleast 10 characters").max(60, "email should not exceed more than 60 characters").matches(/^([a-zA-Z0-9]+)([\{1}])?[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "invalid email format"),
        gender: yup.string().required(),
        office_location: yup.string().required("office location is required").min(5,"office location must be atleast 5 characters").max(200,"office address should not exceed more than 200 characters").matches(/^[A-Za-z0-9 !@#$%^&*,.)(/]+$/i,"invalid address"),
        // salary: yup.number().required(),
        employee_id: yup.string(),
        emp_actions: yup.number()
    })
    .required()

interface IFormInput {
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

function UpdateDetails() {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const success = useAppSelector((state) => state.createEmployee.success)
    const isEdit = useAppSelector((state) => state.editUserData.isEdit)
    const isLoading = useAppSelector((state) => state.editUserData.isLoading)
    const [editUserData, setEditUserData] = React.useState<employeeData>()
    const [openSnackbar,setOpenSnackbar] = React.useState(false)
    const history = useNavigate()
    const params:any = location.state as { editUser: employeeData }
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors, isDirty, isValid ,isValidating},
    } = useForm<IFormInput>({ resolver: yupResolver(schema),
            defaultValues:{
                gender: params?.editUser?.gender.toLowerCase()
            } })
    
    const pageNumber:any = location.state as {pageNumber:Number}

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if( data.designation === ""){
            data.designation = params.editUser.designation;
        };
        if( data.first_name === ""){
            data.first_name = params.editUser.first_name;
        };
        if( data.last_name === ""){
            data.last_name = params.editUser.last_name;
        };
        if( data.gender === ""){
            data.gender = params.editUser.gender;
        };
        if( data.office_location === ""){
            data.office_location = params.editUser.office_location;
        };
        if( data.id === ""){
            data.id = params.editUser.id;
        };
        if( data.employee_id === ""){
            data.employee_id = params.editUser.employee_id;
        };
        if( data.email === ""){
            data.email = params.editUser.email;
        };
        dispatch(editSpecificEmployee(params.editUser?.id,data)); 
    }
   
    useEffect(()=>{
        setEditUserData(params.editUser)
    },[])

    useEffect(()=>{
        if(isEdit){
            setOpenSnackbar(true)
            setTimeout(()=>{
                reset();
                history('/',{state:{pageNumber:pageNumber.pageNumber}})
            },1000)
        }
    },[isEdit])

    const resetFields=()=>{
        reset();
    }
    
    return (
        <div>
            <AppHeader headerName="Edit employee"/>
            <SnackbarMessage openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} snackbarMessage={`${editUserData?.first_name} ${editUserData?.last_name} edited successfully`}></SnackbarMessage>
            <DelayingAppearance loading={isLoading}/>
            <Styles.InputBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>First Name<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                defaultValue={params?.editUser?.first_name}
                                {...register('first_name')}
                                placeholder="first name"
                            />
                            <Styles.ErrorSpan>
                                {errors.first_name &&
                                    errors.first_name.message}
                            </Styles.ErrorSpan>
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Last Name<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                defaultValue={params?.editUser?.last_name}
                                {...register('last_name')}
                                placeholder="last name"
                            />
                            <Styles.ErrorSpan>
                                {errors.last_name &&
                                    errors.last_name.message}
                            </Styles.ErrorSpan>
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>
                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Email<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                type="string"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                defaultValue={params?.editUser?.email}
                                {...register('email')}
                                placeholder="email"
                            />
                            <Styles.ErrorSpan>
                                {errors.email &&
                                    errors.email.message}
                            </Styles.ErrorSpan>
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Gender<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                           
                            <Styles.ErrorDiv>
                                <Controller
                                name="gender"
                                control={control}
                                render={({ field: { ref, ...field } }) => (
                            <Select
                                style={{
                                    height: '45px',
                                    outline: 'none',
                                    borderRadius: '5px',
                                    border: '1px solid #cccccc',
                                    paddingLeft: '15px',
                                    fontSize: '16px',
                                    borderBottomWidth: '2px',
                                    transition: 'all 0.3s ease',
                                    width: '100%',
                                }}
                                defaultValue={params?.editUser?.gender.toLowerCase()}
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                // {...register('gender')}
                                {...field}
                                inputRef={ref}
                            >
                               <MenuItem value="male">male</MenuItem>
                                <MenuItem value="female">female</MenuItem>
                                <MenuItem value="agender">agender</MenuItem>
                                <MenuItem value="bigender">bigender</MenuItem>
                                <MenuItem value="genderqueer">genderqueer</MenuItem>
                                <MenuItem value="others">others</MenuItem>
                            </Select>
                                )}
                            />
                            {""}
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>

                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Designation<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                type="string"
                                defaultValue={params?.editUser?.designation}
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('designation')}
                                placeholder="designation"
                            />
                            <Styles.ErrorSpan>
                                {errors.designation &&
                                    errors.designation.message}
                            </Styles.ErrorSpan>
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>
                                Office Location<Styles.SpanAsterisk>*</Styles.SpanAsterisk>
                            </Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                type="string"
                                defaultValue={params?.editUser?.office_location}
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('office_location')}
                                placeholder="office location"
                            />
                            <Styles.ErrorSpan>
                                {errors.office_location &&
                                    errors.office_location.message}
                            </Styles.ErrorSpan>
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>
                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Employee Id</Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                value={params?.editUser?.employee_id}
                                disabled
                                readOnly
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('employee_id', {
                                    // value: editUserData?.employee_id,
                                })}
                                placeholder="employee id"
                            />{""}
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>
                    <Styles.OuterDiv>
                    <Styles.InnerDiv>
                        <Styles.Input type="submit" style={{backgroundColor:isValid? '#1976d2':"#808080", color:'#FFF'}}/>
                    </Styles.InnerDiv>
                    <Styles.InnerDiv>
                        <Styles.Button type="reset" onClick={resetFields}>Reset</Styles.Button>
                    </Styles.InnerDiv>
                    </Styles.OuterDiv>
                </form>
            </Styles.InputBox>
        </div>
    )
}

export default UpdateDetails
