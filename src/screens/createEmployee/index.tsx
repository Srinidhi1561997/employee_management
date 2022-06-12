import React, { useEffect } from 'react'
import { takeEvery, put, call, StrictEffect } from "redux-saga/effects";
// import { useLocation } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate  } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MenuItem, Select } from '@mui/material'
import { CreateEmployeeAction } from './slice'
import AppHeader from '../../components/appBar'
import Styles from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { createEmployees } from '../../reducers/actions'
import * as Constants from '../../utils/constants'
// import { GET_EMPLOYEES } from '../App/reduxTypes'

const schema = yup
    .object({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        designation: yup.string().required(),
        email: yup.string().required(),
        gender: yup.string().required(),
        office_location: yup.string().required(),
        // salary: yup.number().required(),
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
}

function CreateEmployee() {
    const dispatch = useAppDispatch()
    const success = useAppSelector((state) => state.createEmployee.success)
    const isLoading = useAppSelector((state) => state.createEmployee.isLoading)
    const history = useNavigate ()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
      dispatch(createEmployees(data));
        // dispatch({type:"CREATE_EMPLOYEE", data});
        // if(success?.status === 201)
        // res.then((response) => {
        //     console.log('success', response)
        //     dispatch({ type: GET_EMPLOYEES })
        // }).catch((err) => {
        //     console.log('error is', err)
        // })    
    }
   
    useEffect(()=>{
        if(isLoading){
            history('/');            
        }
    },[isLoading])
    // const minSalary = 500000
    // const maxSalary = 2000000
    // const randSalary = Math.floor(Math.random() * minSalary) + maxSalary
    console.log('hello', success)
    return (
        <div>
            <AppHeader />
            <Styles.InputBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>First Name<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('first_name', {
                                    required: true,
                                    maxLength: 20,
                                })}
                                placeholder="first name"
                            />
                            <p>
                                {errors.first_name?.type === 'required' &&
                                    'First name is required'}
                            </p>
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Last Name<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('last_name', {
                                    pattern: /^[A-Za-z]+$/i,
                                })}
                                placeholder="last name"
                            />
                            <p>
                                {errors.first_name?.type === 'required' &&
                                    'First name is required'}
                            </p>
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>
                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Email<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.Input
                                type="string"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('email')}
                                placeholder="email"
                            />{' '}
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Gender<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            {/* <Styles.Input
                                type="string"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('gender')}
                                placeholder="gender"
                            />{' '} */}
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
                                    width: '63%',
                                }}
                                // labelId="demo-simple-select-autowidth-label"
                                // id="demo-simple-select"
                                // label="Gender"
                                defaultValue="male"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('gender')}
                                // {...register('male')}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Others</MenuItem>
                            </Select>
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>

                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Designation<Styles.SpanAsterisk>*</Styles.SpanAsterisk></Styles.InputTitle>
                            <Styles.Input
                                type="string"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('designation')}
                                placeholder="designation"
                            />{' '}
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>
                                Office Location<Styles.SpanAsterisk>*</Styles.SpanAsterisk>
                            </Styles.InputTitle>
                            <Styles.Input
                                type="string"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('office_location')}
                                placeholder="office location"
                            />{' '}
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>
                    <Styles.OuterDiv>
                        <Styles.InnerDiv>
                            <Styles.InputTitle>Employee Id</Styles.InputTitle>
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                // value={randomNumber}
                                readOnly
                                // name="employee_id"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('employee_id', {
                                    value: Constants.randomNumber,
                                })}
                                placeholder="first name"
                            />
                            <p>
                                {errors.first_name?.type === 'required' &&
                                    'First name is required'}
                            </p>
                        </Styles.InnerDiv>
                        <Styles.InnerDiv>
                            
                        </Styles.InnerDiv>
                    </Styles.OuterDiv>
                    <Styles.InnerDiv>
                        <Styles.Input type="submit" />
                    </Styles.InnerDiv>
                </form>
            </Styles.InputBox>
        </div>
    )
}

export default CreateEmployee