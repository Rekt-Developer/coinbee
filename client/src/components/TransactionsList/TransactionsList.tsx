import { FC } from 'react'
import { TTransactionsList } from '../../api/transactions'
import { TransactionsItem } from '../TransactionsItem'
import styles from './TransactionsList.module.scss'

type TTransactionsListProps = { 
  data: TTransactionsList
}

export const TransactionsList: FC<TTransactionsListProps> = ({data}) => {
  const list: string[] = ['Date', 'Transaction ID', 'Type', 'Name', 'Value', 'Return', 'Status', 'Action'];

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
            <TransactionsItem data={item}/>
          </li>
        ))}
      </ul>
    </div>
  )
}