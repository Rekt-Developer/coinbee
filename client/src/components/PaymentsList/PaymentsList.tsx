import { FC } from 'react'
import styles from './PaymentsList.module.scss'
import { PaymentsItem } from './PaymentsItem'
import { TPaymentsList } from '../../api/payments'

type TTransactionsListProps = { 
  data: TPaymentsList
}

export const PaymentsList: FC<TTransactionsListProps> = ({data}) => {
  const list: string[] = ['Payment ID', 'Type', 'Amount', 'Date', 'Status', 'Email', 'Action'];

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
            <PaymentsItem data={item}/>
          </li>
        ))}
      </ul>
    </div>
  )
}