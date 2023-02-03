import React, {useState} from 'react'
import styles from '../styles/Admin.module.scss'
import ConnectionForm from '../components/ConnectionForm/ConnectionForm'
import NewPostForm from '../components/NewPostForm/NewPostForm'

export default function admin() {

    const [admin, setAdmin] = useState(true)

  return (
    <div className={styles.admin}>
        {
            admin ?
            <NewPostForm />
        :
            <ConnectionForm />
            }
    </div>
  )
}
