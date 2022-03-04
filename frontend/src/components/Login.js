import React,{ useState, useEffect } from 'react';
import FormContainer from './FormContainer';
import Loader from './Loader';
import Message from './Message';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../action/userAction';
import { listLocation } from '../action/locationAction';
import { USER_LOGOUT, DATE_LOGIN_SUCCESS } from '../constants/UserConstants'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [errorMsg, setErrorMsg] = useState('')
    
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo, userDateLogin} = userLogin

    useEffect(() =>{
        setErrorMsg(error)
        if(error=='Request failed with status code 404'){  
            setErrorMsg('Brak połaczenia z serwerem')
        }else if(error=='Request failed with status code 500'){  
            setErrorMsg('Bład serwera')
        }else if(error=='No active account found with the given credentials'){  
            setErrorMsg('Niepoprawna nazwa użytkownika lub hasła')
        }else{
            setErrorMsg(error)
        }

    }, [error])   
    
    const today = (new Date().valueOf())

    const converDate = Date.parse(userDateLogin)

    useEffect(() =>{
        if(userInfo){
            if((converDate + 1000*60*1 ) < today){
                console.log('userDateLogin2', userDateLogin.valueOf())
            }else{
                dispatch(listLocation()) 
                navigate('/mainpage')
            }
        }
    }, [ userInfo, userDateLogin ]) 

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        trigger,
    } = useForm()

    const onSubmit = (data) => {
        dispatch(login(data.userName, data.password))
        reset()   
    }

    return (
        <FormContainer className='center-position'>
                <h2>Wypożyczalnia samochodów</h2>
                <h4>Logowanie do systemu</h4>
                {loading && <Loader/>}
                {errorMsg && <Message variant='danger'>{errorMsg}</Message>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId='userName'>
                        <Form.Label>Nazwa użytkownika</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder = 'Nazwa użytkownika'
                                {...register("userName", 
                                    {
                                        required: 'Pole wymagane',
                                        minLength: {
                                            value: 2,
                                            message: 'Nazwa uzytkownika musi składać się z przynajmniej 2 liter',
                                        },
                                        pattern: {
                                            value: /[A-Za-z -]/,
                                            message: 'Można używać tylko liter',
                                        },
                                    }                               
                                )}
                                onKeyUp={() => {trigger("userName")}}
                                name = 'userName'
                            >

                            </Form.Control>
                            {errors.userName && (<div className='form-msg-style'>{errors.userName.message}</div>)}
                    </Form.Group> 

                    <Form.Group controlId='password'>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder = 'Hasło'
                            {...register("password", 
                                {
                                    required: 'Pole wymagane',
                                    minLength: {
                                        value: 8,
                                        message: 'Hasło musi mieć przynajmniej 8 znaków',
                                    },
                                }                               
                            )}
                            onKeyUp={() => {trigger("password")}}
                            name = 'password'
                        >
                        </Form.Control>
                        {errors.password && (<div className='form-msg-style'>{errors.password.message}</div>)}
                    </Form.Group>

                    <Button 
                        type='submit'
                        variant='primary' 
                        className = 'mt-1'
                    >
                        Zaloguj się
                    </Button>
                </Form>
        </FormContainer>
    )
}

export default Login
