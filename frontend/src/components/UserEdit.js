import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import Message from './Message';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserDetails } from '../action/userAction';
import { useParams, useNavigate } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../constants/UserConstants';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons";

import {
    USER_EDIT_TITLE,
    USER_EDIT_NAME_TITLE,
    USER_EDIT_EMAIL_TITLE,
    USER_EDIT_CHANGE_PASSWORD_TITLE,
    USER_EDIT_PASSWORD_TITLE,
    USER_EDIT_CONFIRM_PASSWORD_TITLE,
    USER_EDIT_ADMIN_TITLE,

    USER_EDIT_NAME_PLACEHOLDER,
    USER_EDIT_EMAIL_PLACEHOLDER,
    USER_EDIT_PASSWORD_PLACEHOLDER,
    USER_EDIT_CONFIRM_PASSWORD_PLACEHOLDER,

    USER_EDIT_NAME_REQUIRED,
    USER_EDIT_NAME_MIN_LENGTH,
    USER_EDIT_NAME_PATTERN,

    USER_EDIT_EMAIL_PATTERN,

    USER_EDIT_PASSWORD_REQUIRED,
    USER_EDIT_PASSWORD_MIN_LENGTH,

    USER_EDIT_CONFIRM_PASSWORD_REQUIRED,
    USER_EDIT_CONFIRM_PASSWORD_MIN_LENGTH,

    ENTERED_PASSWORD_ARE_NOT_THE_SAME,
    BTN_BACK,
    BTN_CHANGE
} from '../constants/EnvConstans'

function UserEdit() {
    const params = useParams()
    const userId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [messagePassword, setMessagePassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)
    const preloadedValues = {
        name : 'name',
        email : 'email',
    }

    const userDetails = useSelector(state => state.userDetails)
    const {user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { success: successUpdate } = userUpdate

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm( {defaultValues: preloadedValues})

    useEffect(() =>{
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userslist')
        }else{
            if(!user.name || user._id !== Number(userId)){
                dispatch(getUserDetails(userId))
            } else {
                
                reset({name:user.username, email:user.email})
                if (user.IsAdmin){
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            }
        }
    }, [user, userId, successUpdate]) 


    const submitHandler = (data) => {
        if(changingPassword){
            if(data.password != data.passwordConfirm){
                setMessagePassword(ENTERED_PASSWORD_ARE_NOT_THE_SAME)
                reset({password:'', passwordConfirm:''})
            }else{
                dispatch(updateUser({id:user._id, name: data.name, email: data.email, password:data.password, isAdmin, changingPassword}))
            }  
        }else{
            dispatch(updateUser({id:user._id, name: data.name, email: data.email, isAdmin, changingPassword}))
        }    
    }

    useEffect(() => {
        const timeout = setTimeout(() =>{
            setMessagePassword('')
        }, 5000)
        
        return () => clearTimeout(timeout)
    }, [messagePassword])

    return (
        <main>
            <Header />
            <FormContainer>
                    {messagePassword && <Message variant='danger'>{messagePassword}</Message>}
                    <Row>
                        <Col>
                            <h2>{USER_EDIT_TITLE}</h2>
                        </Col>
                        <Col className='btn-position'>
                            <LinkContainer to={`/admin/userslist`}>  
                                <Button className='btn-md btn-back'>
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                </Button>
                            </LinkContainer>                                                  
                        </Col>

                    </Row>

                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group controlId='name'>
                            <Form.Label>{USER_EDIT_NAME_TITLE}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder = {USER_EDIT_NAME_PLACEHOLDER}
                                {...register("name", 
                                {
                                    required: USER_EDIT_NAME_REQUIRED,
                                    pattern: {
                                    value: /[A-Za-z -]/,
                                    message: USER_EDIT_NAME_PATTERN,
                                    },
                                    minLength: {
                                        value: 2,
                                        message: USER_EDIT_NAME_MIN_LENGTH,
                                    },
                                }                               
                                )}
                                onKeyUp={() => {trigger("name")}}
                                name = 'name'
                            >
                                    </Form.Control>
                                    {errors.name && (<div className='form-msg-style'>{errors.name.message}</div>)}
                                </Form.Group>                         

                            <Form.Group controlId='email'>
                                    <Form.Label>{USER_EDIT_EMAIL_TITLE}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder = {USER_EDIT_EMAIL_PLACEHOLDER}
                                            {...register("email", {
                                                pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: {USER_EDIT_EMAIL_PATTERN},                                
                                        
                                            }})}
                                            onKeyUp={() => {trigger("email")}}
                                            name = 'email'
                                        >
                                        </Form.Control>
                                        {errors.email && (<div className='form-msg-style'>{errors.email.message}</div>)}
                                </Form.Group> 
                                <Form.Group controlId='changingPassword' className='mt-3 mb-3'>
                                    <Form.Check
                                        type='checkbox'
                                        label = {USER_EDIT_CHANGE_PASSWORD_TITLE}
                                        checked ={changingPassword}
                                        name = 'changingPassword'
                                        onChange={(e) => setChangingPassword(e.target.checked)}
                                    >
                                    </Form.Check>
                                </Form.Group>
                                {changingPassword ?
                                <section> 
                                    <Form.Group controlId='password'>
                                        <Form.Label>{USER_EDIT_PASSWORD_TITLE}</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder = {USER_EDIT_PASSWORD_PLACEHOLDER}
                                            {...register("password", 
                                                {
                                                    required: USER_EDIT_PASSWORD_REQUIRED,
                                                    minLength: {
                                                        value: 8,
                                                        message: USER_EDIT_PASSWORD_MIN_LENGTH,
                                                    },
                                                }                               
                                            )}
                                            onKeyUp={() => {trigger("password")}}
                                            name = 'password'
                                        >
                                        </Form.Control>
                                        {errors.password && (<div className='form-msg-style'>{errors.password.message}</div>)}
                                    </Form.Group>
                                 
                                
                                    <Form.Group controlId='passwordConfirm'>
                                        <Form.Label>{USER_EDIT_CONFIRM_PASSWORD_TITLE}</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder = {USER_EDIT_CONFIRM_PASSWORD_PLACEHOLDER}
                                            {...register("passwordConfirm", 
                                                {
                                                    required: USER_EDIT_CONFIRM_PASSWORD_REQUIRED,
                                                    minLength: {
                                                        value: 8,
                                                        message: USER_EDIT_CONFIRM_PASSWORD_MIN_LENGTH,
                                                    },
                                                }                               
                                            )}
                                            onKeyUp={() => {trigger("passwordConfirm")}}
                                            name = 'passwordConfirm'
                                        >
                                        </Form.Control>
                                        {errors.passwordConfirm && (<div className='form-msg-style'>{errors.passwordConfirm.message}</div>)}
                                    </Form.Group> 
                                </section>
                                : null}
                                <Form.Group controlId='isadmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label = {USER_EDIT_ADMIN_TITLE}
                                        checked ={isAdmin}
                                        name = 'isadmin'
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary' className='bnt-block bg-brown rounded my-3'>
                                    {BTN_CHANGE}
                                </Button>
                    </Form>
            </FormContainer>
        </main>
    )
}

export default UserEdit
