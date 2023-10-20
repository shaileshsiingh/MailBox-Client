import classes from './Welcome.module.css';

import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../storeRedux/authReducer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { mailSliceAction } from '../storeRedux/emailReducer';


const Welcome = () => {
  const dispatch=useDispatch();
  const unRead=useSelector(state=>state.mail.unRead)
  const myEmail=localStorage.getItem('email').replace(/['@','.']/g,'');

  const logoutHandler =()=>{
    dispatch(authAction.logout());
  }
  let noOfUnread=0;

  useEffect(()=>{
    const fetchDaata=async()=>{
        const reponse=await fetch(`https://mailbox-ca21f-default-rtdb.firebaseio.com/inbox/${myEmail}.json`);

        const mailData=await reponse.json();
        console.log('useEffectcalled', mailData);
        for(let key in mailData){
            // data=[{id:key,...mailData[key]},...data]
            if(mailData[key].dot===true){
              noOfUnread++
              // console.log(noOfUnread,'noOfUnread');
            }
        }
        console.log(noOfUnread,'noOfUnread');

        dispatch(mailSliceAction.updateUnread(noOfUnread))
      
    }
    fetchDaata();
},[])

  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.header}>
          <div className={classes.welcome}>Welcome to Mail Box</div>
          <Link to='/send' style={{textDecoration:'none'}}>Compose Email</Link>
          <Link to='/inbox' style={{textDecoration:'none'}}>Inbox {unRead}</Link>
          <Link to='/sentbox' style={{textDecoration:'none'}}>Sentbox</Link>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
      
    </Fragment>
  )
}

export default Welcome

