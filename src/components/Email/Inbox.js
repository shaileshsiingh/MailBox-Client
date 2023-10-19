import React, { useEffect } from 'react';
import { inboxAction } from '../storeRedux/emailReducer';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Inbox.module.css';

function Inbox() {
    const mailInInbox = useSelector((state) => {
        console.log('Redux state:', state);
        return state.mail.mails;
      });
  const myEmail = localStorage.getItem('email').replace(/[@.]/g, ''); // Remove single quotes around @ and .

  const dispatch = useDispatch();
  let data = [];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://mailbox-ca21f-default-rtdb.firebaseio.com/${myEmail}.json`
      );

      const mailData = await response.json();
      console.log('useEffect called', mailData);
      for (let key in mailData) {
        data.unshift({ id: key, ...mailData[key] });
      }

      dispatch(inboxAction.updateInbox(data));
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once

  console.log(data, 'data');
  console.log(mailInInbox.sender);

  return (
    <div className={classes.main}>
      <div className={classes.row}>
        {mailInInbox.map((item) => (
          <div className={classes.row1} key={item.id}>
            <div className={classes.user}>{item.sender}</div>
            <div className={classes.subject}>{item.subject}</div>
            <div className={classes.subject}>{item.message}</div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Inbox;
