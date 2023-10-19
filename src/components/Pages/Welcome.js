// import classes from './Welcome.module.css';

import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { authAction } from '../storeRedux/authReducer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const Welcome = () => {
  const dispatch=useDispatch()

  const logoutHandler =()=>{
    dispatch(authAction.logout());
  }

  return (
    <Fragment>
    
<Button onClick={logoutHandler}>logout</Button> <br></br>
<Link to='/send'>Compose Email</Link> <br></br>
<Link to='/inbox'>Inbox</Link>
    </Fragment>
  )
}

export default Welcome