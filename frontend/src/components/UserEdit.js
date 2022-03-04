import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import Message from './Message';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserDetails } from '../action/userAction';
import { useParams, useNavigate } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../constants/UserConstants'

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
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading:loadingUpdate, success: successUpdate } = userUpdate

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
                setMessagePassword('Podane hasła nie są takie same')
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
                    <h1>Edycja Użytkownika</h1>
                    {messagePassword && <Message variant='danger'>{messagePassword}</Message>}
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nazwa użytkownika</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder = 'Brak nazwy użytkownika'
                                {...register("name", 
                                {
                                    required: 'Pole wymagane',
                                    pattern: {
                                    value: /[A-Za-z -]/,
                                    message: 'Można uzywać tylko liter',
                                    },
                                    minLength: {
                                        value: 2,
                                        message: 'Nazwa uzytkownika musi składać się z przynajmniej 2 liter',
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
                                    <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder = 'Brak adresu email'
                                            {...register("email", {
                                                pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Niepoprawny format email',                                
                                        
                                            }})}
                                            // onChange={(e) => setEmail(e.target.value)}
                                            onKeyUp={() => {trigger("email")}}
                                            name = 'email'
                                        >
                                        </Form.Control>
                                        {errors.email && (<div className='form-msg-style'>{errors.email.message}</div>)}
                                </Form.Group> 
                                <Form.Group controlId='changingPassword' className='mt-3 mb-3'>
                                    <Form.Check
                                        type='checkbox'
                                        label = 'Chcę zmienić hasło pracownika/użytkownika'
                                        checked ={changingPassword}
                                        name = 'changingPassword'
                                        onChange={(e) => setChangingPassword(e.target.checked)}
                                    >
                                    </Form.Check>
                                </Form.Group>
                                {changingPassword ?
                                <section> 
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
                                 
                                
                                    <Form.Group controlId='passwordConfirm'>
                                        <Form.Label>Powtórz hasło</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder = 'Potwierdź hasło'
                                            {...register("passwordConfirm", 
                                                {
                                                    required: 'Pole wymagane',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Hasło musi mieć przynajmniej 8 znaków',
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
                                        label = 'Admin'
                                        checked ={isAdmin}
                                        name = 'isadmin'
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary' className='bnt-block bg-brown rounded my-3'>
                                    Zmień
                                </Button>
                    </Form>
            </FormContainer>
        </main>
    )
}

export default UserEdit
