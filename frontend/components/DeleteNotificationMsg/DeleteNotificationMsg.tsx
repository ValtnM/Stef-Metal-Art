import React, {useState} from 'react'
import styles from './DeleteNotificationMsg.module.scss'
import {AiOutlineClose} from 'react-icons/ai';

export default function DeleteNotificationMsg(props: {deleteNotificationMsg: string, setDeleteNotificationMsg: any}) {

  const [deleteInProgress, setDeleteInProgress] =  useState(false)

  const deleteComponent = () => {
    setDeleteInProgress(true);
    setTimeout(() => {
      props.setDeleteNotificationMsg('')
    }, 800)
  }

  return (
    <div className={deleteInProgress ? `${styles.DeleteNotificationMsg} ${styles.deleteInProgress}` : `${styles.DeleteNotificationMsg}`}>
      <p>{props.deleteNotificationMsg}</p>
      {/* <AiOutlineClose onClick={() => props.setDeleteNotificationMsg("")} className={styles.closeBtn} /> */}
      <AiOutlineClose onClick={() => deleteComponent()} className={styles.closeBtn} />
    </div>
  )
}
