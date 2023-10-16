import classes from './Welcome.module.css';

import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { authAction } from '../storeRedux/authReducer';

const Welcome = () => {
  const dispatch=useDispatch()

  const logoutHandler =()=>{
    dispatch(authAction.logout());
  }

  return (
    <Fragment>
      <div>Welcome</div>
<button onClick={logoutHandler}>logout</button>
    </Fragment>
  )
}

export default Welcome