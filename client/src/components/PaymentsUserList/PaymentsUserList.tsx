import { FC } from 'react'
import styles from './PaymentsUserList.module.scss'
import { TPaymentUserList } from '../../api/paymentUser'
import { PaymentsUserItem } from './PaymentsUserItem'

type TPaymentsUserListProps = { 
  data: TPaymentUserList
}

export const PaymentsUserList: FC<TPaymentsUserListProps> = ({data}) => {
  const list: string[] = ['Transaction ID', 'Date', 'Products', 'Amounts', 'Status', 'Action'];

  return (
    <div className={styles.wrapp}>
      <ul className={styles.headerList}>
      {list.map(item => (
          <li key={item}>
            <h3>{item}</h3>
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        {data.map(item => (
          <li key={item.id}>
            <PaymentsUserItem data={item}/>
          </li>
        ))}
      </ul>
    </div>
  )
}