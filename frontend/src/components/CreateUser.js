import React,{ useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../action/userAction'
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from '../components/FormContainer';
import Header from './Header';
import Message from './Message';
import Loader from './Loader'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons"

function CreateUser() {

    const [msgEmail, setMsgEmail] = useState(false)
    const [messagePassword, setMessagePassword] = useState('')
    const dispatch = useDispatch()
    const userCreateReducers = useSelector(state => state.userCreateReducers)
    const {error, loading, userInfo} = userCreateReducers

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm()

    const onSubmit = (data) => {
        if(data.password != data.passwordConfirm){
            setMessagePassword('Podane hasła nie są takie same')
        }
        else{
            dispatch(createUser(data.name, data.email, data.password))
            setMsgEmail(true)
        }
        reset()
    }

    useEffect(() => {
        const timeout = setTimeout(() =>{
            setMsgEmail(false)
            setMessagePassword('')
        }, 5000)

        return () => clearTimeout(timeout)
    }, [msgEmail, messagePassword])

    return (
        <main>
            <Header />
            <FormContainer>
               {messagePassword && <Message variant='danger'>{messagePassword}</Message>}
               {msgEmail && error &&<Message variant='danger'>{error}</Message>}
               {loading && <Loader/>}
               <Row>
                    <Col>
                        <h2>Utwórz konto</h2>
                    </Col>

                    <Col className='btn-position'>
                        <LinkContainer to={`/admin/userslist`}>  
                            <Button className='btn-md btn-back'>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} /> Powrót
                            </Button>
                        </LinkContainer>                    
                    </Col>
               </Row>
                
               <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nazwa użytkownika</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder = 'Brak nazwy użytkownika'
                            {...register("name", 
                                {
                                    required: 'Pole wymagane',
                                    minLength: {
                                        value: 2,
                                        message: 'Nazwa uzytkownika musi składać się z przynajmniej 2 liter',
                                    },
                                    pattern: {
                                        value: /[A-Za-z -]/,
                                        message: 'Można uzywać tylko liter',
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
                                onKeyUp={() => {trigger("email")}}
                                name = 'email'
                            >
                            </Form.Control>
                            {errors.email && (<div className='form-msg-style'>{errors.email.message}</div>)}
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

                    <Button type='submit' variant='primary' className='my-3 bnt-block bg-brown rounded'>
                        Zapisz
                    </Button>
                </Form>
            </FormContainer>
        </main>
    )
}

export default CreateUser
