import { HtmlHTMLAttributes, FC } from 'react'
import Bell from '../../assets/img/bell.svg?react'
import styles from './Notifications.module.scss'

interface INotificationsProps extends HtmlHTMLAttributes<HTMLButtonElement> { 
  count: string
}

export const Notifications: FC<INotificationsProps> = ({count, ...props}) => {
  return (
    <button className={styles.notificationBtn} {...props}>
      <Bell stroke='var(--color-text)'/>
      <span className={styles.notificationBtnCount}>{count}</span>
    </button>
  )
}