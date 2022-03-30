import React,{ useState, useEffect } from 'react'
import Header from './Header';
import FormContainer from './FormContainer';
import BackLogin from './BackToLogin';
import { Form, Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';
import { getUserDetails, updateUserProfile } from '../action/userAction';
import { USER_UPDATE_PROFILE_RESET, USER_DETAILS_RESET } from '../constants/UserConstants';

function MyProfile() {
    const navigate = useNavigate()
    const [messagePassword, setMessagePassword] = useState('')
    const [messageDetails, setMessageDetails] = useState('')
    const [errorUserUpdate, setErrorUserUpdate] = useState(false)
    const [successMsgUpdate, setSuccessMsgUpdate] = useState(false)
    const [errorMsgInfo, setErrorMsgInfo] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {errorDetailsFail, loading, user} = userDetails
    
    const dispatch = useDispatch()

    const preloadedValues = {
        name : 'name',
        email : 'email'
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, errorProfileFail, msgSuccess, loading: updateLoading } = userUpdateProfile

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm( {defaultValues: preloadedValues})   
    
    useEffect(() =>{
        if(!userInfo){
            navigate('/')
        }else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                if(errorDetailsFail==='Request failed with status code 500'){
                    setMessageDetails('Bład serwera')
                }else{
                    setMessageDetails('Błąd sieciowy')
                }
                if(errorDetailsFail){
                    dispatch({type:USER_UPDATE_PROFILE_RESET})
                    let timeout = setTimeout(() =>{
                            navigate('/mainpage')
                    }, 5000)
                    return () => clearTimeout(timeout)
                }
            }else {
                reset({name:user.username, email:user.email})
            }
        }
    }, [dispatch, reset, userInfo, success, user]) 



    const submitHandler = (data) => {

        if(data.password != data.passwordConfirm){
            setMessagePassword('Podane hasła nie są takie same')
            reset({password:'', passwordConfirm:''})
        }
        else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name':data.name,
                'email': data.email,
                'password': data.password
            }))
                reset({password:'', passwordConfirm:''})
                dispatch(submitTest)
        }
        
    }

    const submitTest = () => {
        if(msgSuccess){
            setSuccessMsgUpdate(true)
        }
    }


    useEffect(() => {

        if(errorProfileFail){
            console.log('jest error')
        }else{
            console.log('bład nie wystąpił')
        }
    }, [errorMsgInfo, errorProfileFail])

    useEffect(() => {
            if(errorProfileFail){
                if(errorProfileFail==='Request failed with status code 500'){  
                    setMessagePassword('Bład serwera')
                } else if  (errorProfileFail==='Request failed with status code 404'){
                    setMessagePassword('Brak połaczenia z serwerem')
                }else{
                    setMessagePassword('Błąd sieciowy')
                }
            } 
    }, [errorProfileFail])

    useEffect(() => {
        const timeout = setTimeout(() =>{
            if(messagePassword){
                navigate('/mainpage')
            }
        }, 5000)
        
        return () => clearTimeout(timeout)
    }, [messagePassword,])

    return (
        <main>
            <BackLogin />
            <Header />
            <FormContainer>
                {loading ? (<Loader/>)
                    :errorDetailsFail
                    ? (<Message variant='danger'>{messageDetails}</Message>)
                    : updateLoading ? (<Loader/>)
                        :
                    
                    ( 
                        <div>
                            <h1>Zmiana hasła</h1>
                            {successMsgUpdate &&<Message variant='success'>Hasło zostało zmienione</Message>}
                            {messagePassword && <Message variant='danger'>{messagePassword}</Message>}
                            <Form onSubmit={handleSubmit(submitHandler)}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Nazwa użytkownika</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder = 'Brak nazwy użytkownika'
                                        disabled
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
                                            disabled
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
                        </div>
                    )
                }
            </FormContainer>
        </main>
    )
}

export default MyProfile
