import React, { useEffect } from 'react'
import { useForm, SubmitHandler, useFormState } from 'react-hook-form'
import { useNavigate  } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MenuItem, Select } from '@mui/material'
import AppHeader from '../../components/appBar'
import Styles from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { createEmployees } from '../../reducers/actions'
import * as Constants from '../../utils/constants'
import SnackbarMessage from '../../components/snackbar';
import DelayingAppearance from '../../components/circularProgressBar'

const schema = yup
    .object({
        first_name: yup.string().required("frst name is required").min(3,"first name must be atleast 3 characters").max(20," first name should not exceed more than 20 characters").matches(/^[A-Za-z_ ]+$/i,"first name should contain only character"),
        last_name: yup.string().required("last name is required").min(3, "last name must be atleast 3 characters").max(20, "last name should not exceed more than 20 characters").matches(/^[A-Za-z_ ]+$/i, "last name should contain only character"),
        designation: yup.string().required("designation is required").min(5,"designation must be atleast 5 characters").max(50,"designation should not exceed more than 50 characters").matches(/^[A-Za-z0-9_ ]+$/i, "splecial characters are not allowed"),
        email: yup.string().required("email is required").min(10,"email must be atleast 10 characters").max(60, "email should not exceed more than 60 characters").matches(/^([a-zA-Z0-9]+)([\{1}])?[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "invalid email format"),
        gender: yup.string().required(),
        office_location: yup.string().required("office location is required").min(5,"office location must be atleast 5 characters").max(200,"office address should not exceed more than 200 characters").matches(/^[A-Za-z0-9 !@#$%^&*,.)(/]+$/i,"invalid address"),
        employee_id: yup.string().required(),
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
    id: string
}

function CreateEmployee() {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector((state) => state.createEmployee.isLoading)
    const history = useNavigate ()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors,isDirty,isValid },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) })
    const [openSnackbar, setOpenSnackbar] = React.useState(false)

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
      dispatch(createEmployees(data));   
    }
   
    useEffect(()=>{
        if(isLoading){
            setOpenSnackbar(true)
            setTimeout(()=>{
                reset();
                history('/');
            },1000)                      
        }
    },[isLoading])

    const resetFields=()=>{
        reset();
    }

    return (
        <div>
            <AppHeader headerName="Add new employee"/>
            <SnackbarMessage openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} snackbarMessage={`Employee created successfully`}></SnackbarMessage>
            <DelayingAppearance loading={isLoading}/>
            <Styles.InputBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Styles.OuterDiv>
                        <Styles.InnerDiv >
                            <Styles.InputTitle>First Name<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
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
                                {...register('last_name')}
                                placeholder="last name"
                            />
                            <Styles.ErrorSpan>
                                {errors.first_name &&
                                    errors.last_name?.message}
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
                                {...register('email')}
                                placeholder="email"
                            />
                            <Styles.ErrorSpan>
                                {errors.email &&
                                    errors.email?.message}
                            </Styles.ErrorSpan>
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Gender<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.ErrorDiv>
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
                                defaultValue=""
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('gender')}
                            >
                                <MenuItem value="male">male</MenuItem>
                                <MenuItem value="female">female</MenuItem>
                                <MenuItem value="agender">agender</MenuItem>
                                <MenuItem value="bigender">bigender</MenuItem>
                                <MenuItem value="genderqueer">genderqueer</MenuItem>
                                <MenuItem value="others">others</MenuItem>
                            </Select>{""}
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>

                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Designation<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                type="string"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('designation')}
                                placeholder="designation"
                            />
                            <Styles.ErrorSpan>
                                {errors.designation &&
                                    errors.designation?.message}
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
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('office_location')}
                                placeholder="office location"
                            />
                            <Styles.ErrorSpan>
                                {errors.office_location &&
                                    errors.office_location?.message}
                            </Styles.ErrorSpan>
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>
                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Employee Id</Styles.InputTitle>
                            <Styles.ErrorDiv>
                            <Styles.Input
                                value={Constants.randomNumber}
                                readOnly
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('employee_id', {
                                    // value: Constants.randomNumber,
                                })}
                                placeholder="employee_id"
                            />{""}
                            </Styles.ErrorDiv>
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>
                    <Styles.OuterDiv>
                    <Styles.InnerDiv>
                        <Styles.Input type="submit" style={{
                            backgroundColor: '#1976d2',
                            // isDirty &&isValid? '#1976d2':"#808080", 
                            color:'#FFF'}}/>
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

export default CreateEmployee
