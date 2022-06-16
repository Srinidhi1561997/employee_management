import React, { useEffect } from 'react'
import { useForm, SubmitHandler, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MenuItem, Select } from '@mui/material'
import AppHeader from '../../components/appBar'
import Styles from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { editSpecificEmployee } from '../../reducers/actions'
import { useNavigate, useLocation } from 'react-router-dom'
import { employeeData } from '../../utils/interface';
import SnackbarMessage from '../../components/snackbar';
import DelayingAppearance from "../../components/circularProgressBar"
import schema from '../../components/inputSchema'
import {IFormInput} from '../../utils/interface'
import "./updateEmployee.css"


function UpdateDetails() {
    const dispatch = useAppDispatch()
    const location = useLocation()
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
        formState: { errors, isValid },
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
            <Styles.Container className='inputBox'>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Styles.Container className='OuterDiv'>
                        <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>First Name<Styles.ContainerSpan className='SpanAsterisk'>*</Styles.ContainerSpan></Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                defaultValue={params?.editUser?.first_name}
                                {...register('first_name')}
                                placeholder="first name"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.first_name &&
                                    errors.first_name.message}
                            </Styles.ContainerSpan >
                            </Styles.Container>
                        </Styles.Container>
                        <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>Last Name<Styles.ContainerSpan className='SpanAsterisk'>*</Styles.ContainerSpan></Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                defaultValue={params?.editUser?.last_name}
                                {...register('last_name')}
                                placeholder="last name"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.last_name &&
                                    errors.last_name.message}
                            </Styles.ContainerSpan >
                            </Styles.Container>
                            </Styles.Container>
                    </Styles.Container>
                    <Styles.Container className='OuterDiv'>
                    <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>Email<Styles.ContainerSpan className='SpanAsterisk'>*</Styles.ContainerSpan></Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
                            <Styles.Input
                                type="string"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                defaultValue={params?.editUser?.email}
                                {...register('email')}
                                placeholder="email"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.email &&
                                    errors.email.message}
                            </Styles.ContainerSpan >
                            </Styles.Container>
                            </Styles.Container>
                        <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>Gender<Styles.ContainerSpan className='SpanAsterisk'>*</Styles.ContainerSpan></Styles.InputTitle>
                           
                            <Styles.Container className='ErrorDiv'>
                                <Controller
                                name="gender"
                                control={control}
                                render={({ field: { ref, ...field } }) => (
                            <Select
                                className='dropDownSelect'
                                defaultValue={params?.editUser?.gender.toLowerCase()}
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                // {...register('gender')}
                                placeholder='gender'
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
                            </Styles.Container>
                            </Styles.Container>
                    </Styles.Container>

                    <Styles.Container className='OuterDiv'>
                    <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>Designation<Styles.ContainerSpan className='SpanAsterisk'>*</Styles.ContainerSpan></Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
                            <Styles.Input
                                type="string"
                                defaultValue={params?.editUser?.designation}
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('designation')}
                                placeholder="designation"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.designation &&
                                    errors.designation.message}
                            </Styles.ContainerSpan >
                            </Styles.Container>
                            </Styles.Container>
                        <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>
                                Office Location<Styles.ContainerSpan className='SpanAsterisk'>*</Styles.ContainerSpan>
                            </Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
                            <Styles.Input
                                type="string"
                                defaultValue={params?.editUser?.office_location}
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('office_location')}
                                placeholder="office location"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.office_location &&
                                    errors.office_location.message}
                            </Styles.ContainerSpan >
                            </Styles.Container>
                            </Styles.Container>
                    </Styles.Container>
                    <Styles.Container className='OuterDiv'>
                    <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>Employee Id</Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
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
                            </Styles.Container>
                            </Styles.Container>
                        <Styles.Container className='InnerDiv'>
                            
                        </Styles.Container>
                    </Styles.Container>
                    <Styles.Container className='OuterDiv'>
                    <Styles.Container className='InnerDiv'>
                        <Styles.Input type="submit" style={{backgroundColor:'#1976d2', color:'#FFF'}}/>
                        </Styles.Container>
                    <Styles.Container className='InnerDiv'>
                        <Styles.Button type="reset" onClick={resetFields}>Reset</Styles.Button>
                        </Styles.Container>
                    </Styles.Container>
                </form>
            </Styles.Container>
        </div>
    )
}

export default UpdateDetails
