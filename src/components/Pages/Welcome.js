import classes from './Welcome.module.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../storeRedux/authReducer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { mailSliceAction } from '../storeRedux/emailReducer';

const Welcome = () => {
  const dispatch = useDispatch();
  const [reRender, setreRender] = useState(true);
  const unRead = useSelector(state => state.mail.unRead);
  const myEmail = localStorage.getItem('email').replace(/['@','.']/g, '');

  let intervalIDToClear;
  intervalIDToClear = setInterval(() => {
    setreRender(prev => !prev);
    console.log('interval', intervalIDToClear);
  }, 7000);

  const clearIntervalHandler = () => {
    clearInterval(intervalIDToClear);
    console.log(intervalIDToClear);
  }

  const logoutHandler = () => {
    dispatch(authAction.logout());
  }
  let noOfUnread = 0;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://mailbox-ca21f-default-rtdb.firebaseio.com/inbox/${myEmail}.json`);
      const mailData = await response.json();
      console.log('useEffect called');
      for (let key in mailData) {
        if (mailData[key].dot === true) {
          noOfUnread++;
        }
      }

      dispatch(mailSliceAction.updateUnread(noOfUnread));
    }

    fetchData();

    return () => {
      clearInterval(intervalIDToClear);
    }
  }, [reRender]);

  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.header}>
          <div className={classes.welcome}>Welcome to Mail Box</div>
          <Link to='/send' style={{ textDecoration: 'none' }}>Compose Email</Link>
          <Link to='/inbox' style={{ textDecoration: 'none' }}>Inbox {unRead}</Link>
          <Link to='/sentbox' style={{ textDecoration: 'none' }}>Sentbox</Link>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
    </Fragment>
  )
}

export default Welcome;
