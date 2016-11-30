import React from 'react'
import styles from './style.css'

const Spin = props => (
  (<div className={props.btn ? styles.spinner + ' ' + styles['spinner-btn'] : styles.spinner}>
    <div className={styles.bounce1} />
    <div className={styles.bounce2} />
    <div className={styles.bounce3} />
  </div>)
)

export default Spin
