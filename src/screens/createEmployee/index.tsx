import React, { useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useNavigate  } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { MenuItem, Select } from '@mui/material'
import AppHeader from '../../components/appBar'
import Styles from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { createEmployees } from '../../reducers/actions'
import * as Constants from '../../utils/constants'
import SnackbarMessage from '../../components/snackbar';
import DelayingAppearance from '../../components/circularProgressBar'
import schema from '../../components/inputSchema'
import {IFormInput} from '../../utils/interface'
import "./createElement.css";

function CreateEmployee() {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector((state) => state.createEmployee.isLoading)
    const history = useNavigate ()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema),
    defaultValues:{
        gender:""
    } })
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
    };

    const OnChangeText=(value:any, key:string)=>{
        // console.log('value', value)
        if(key==='first_name' && value===""){
            reset({gender:""})
        }
    }

    return (
        <div>
            <AppHeader headerName="Add new employee"/>
            <SnackbarMessage openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} snackbarMessage={`Employee created successfully`}></SnackbarMessage>
            <DelayingAppearance loading={isLoading}/>
            <Styles.Container className='inputBox'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Styles.Container className='OuterDiv'>
                        <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>First Name<Styles.ContainerSpan className="SpanAsterisk">*</Styles.ContainerSpan></Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
                            <Controller
                                name="first_name"
                                control={control}
                                render={({ field: { ref, ...field } }) => (
                            <Styles.Input
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('first_name')}
                                placeholder="first name"
                                // {...field}
                                onChange={(e)=>OnChangeText(e.target.value, 'first_name')}
                                // inputRef={ref}
                            />
                            )}
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
                                {...register('last_name')}
                                placeholder="last name"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.first_name &&
                                    errors.last_name?.message}
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
                                {...register('email')}
                                placeholder="email"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.email &&
                                    errors.email?.message}
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
                                defaultValue=""
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                // {...register('gender')}
                                {...field}
                                inputRef={ref}
                                placeholder='gender'
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
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('designation')}
                                placeholder="designation"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.designation &&
                                    errors.designation?.message}
                            </Styles.ContainerSpan >
                            </Styles.Container>
                        </Styles.Container>
                        <Styles.Container className= 'InnerDiv'>
                            <Styles.InputTitle>
                                Office Location<Styles.ContainerSpan className='SpanAsterisk'>*</Styles.ContainerSpan>
                            </Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
                            <Styles.Input
                                type="string"
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('office_location')}
                                placeholder="office location"
                            />
                            <Styles.ContainerSpan className='ErrorSpan'>
                                {errors.office_location &&
                                    errors.office_location?.message}
                            </Styles.ContainerSpan >
                            </Styles.Container>
                        </Styles.Container>
                    </Styles.Container>
                    <Styles.Container className='OuterDiv'>
                        <Styles.Container className='InnerDiv'>
                            <Styles.InputTitle>Employee Id</Styles.InputTitle>
                            <Styles.Container className='ErrorDiv'>
                            <Styles.Input
                                value={Constants.randomNumber}
                                readOnly
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                {...register('employee_id', {
                                    // value: Constants.randomNumber,
                                })}
                                placeholder="employee_id"
                            />{""}
                            </Styles.Container>
                        </Styles.Container>
                        <Styles.Container className='InnerDiv'>
                            
                        </Styles.Container>
                    </Styles.Container>
                    <Styles.Container className='OuterDiv'>
                    <Styles.Container className= 'InnerDiv'>
                        <Styles.Input type="submit" style={{
                            backgroundColor: '#1976d2',
                            // isDirty &&isValid? '#1976d2':"#808080", 
                            color:'#FFF'}}/>
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

export default CreateEmployee
