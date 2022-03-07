import React,{ useEffect } from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listUsers, deleteUser } from '../action/userAction';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import FormContainer from './FormContainer';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faEdit,
        faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons"


function UsersList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList 

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin   

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.IsAdmin){
            dispatch(listUsers())
        }else{
            navigate('/mainpage')
        }

        if(error){
            navigate('/mainpage')
        }
        
    }, [dispatch, userInfo, successDelete,error])


    const deleteHandler = (id) =>{
        if(window.confirm('Czy jesteś pewny, że chcesz skasować użytkownika?')){
            dispatch(deleteUser(id))
        }
    }

    const createUserHandler = () =>{
        navigate('/admin/createuser')
    }

    return (
        <main>
            <Header />
            <FormContainer>
                {loading
                ? (<Loader/>)
                :error
                    ?(<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Row>
                                <Col>
                                    <h2>Lista użytkowników</h2>
                                </Col>
                                <Col className='btn-position-right'>
                                    <div>
                                        <LinkContainer to={`/admin`}>  
                                            <Button 
                                                className='btn-back mt-1 mb-1'
                                            >
                                                <FontAwesomeIcon icon={faAngleDoubleLeft} /> Powrót
                                            </Button>
                                        </LinkContainer>                                        
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='btn-position-right'>
                                    <div>
                                        <Button className="new-location-bg mb-5" onClick={createUserHandler}>
                                            <i className='fas fa-plus'></i> Nowy użytkownik
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            {users.map(user => (
                                <Card key={user._id} className='mb-3'>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row >
                                                <Col>
                                                    {user.username}
                                                </Col>
                                                <Col className='userlist-position'>
                                                    <div>
                                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                            <Button variant='warning' className='btn-md'>
                                                                <FontAwesomeIcon icon={faEdit} /> Edycja
                                                            </Button>
                                                        </LinkContainer>
                                                    </div>
                                                    <div>
                                                        <Button variant='danger' className='btn-md mt-1' onClick={() => deleteHandler(user._id)}>
                                                            <i class="fas fa-trash"></i> Kasuj
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            ))}
                        </div>                    
                    )
                
                }
            </FormContainer>
        </main>
    )
}

export default UsersList
