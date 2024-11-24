import { FC, useContext } from 'react'
import { TTransactionsItem } from '../../api/transactions'
import styles from './TransactionsItem.module.scss'
import { Status } from '../../ui/Status'
import { colorStatus } from '../../utils/statusColor'
import { ActionsBar } from '../ActionsBar'
import { useTransactionsAction } from '../../hooks/useTransactionsAction'
import CardSVG from '../../assets/img/transactionsCard.svg?react'
import CoinSVG from '../../assets/img/transactionsCoin.svg?react'
import { ThemeContext } from '../../Providers/ThemeProvider'

type TTransactionsItemProps = { 
  data: TTransactionsItem
}

export const TransactionsItem: FC<TTransactionsItemProps> = ({data}) => {
  const del = useTransactionsAction(data.id, 'delete')
  const release = useTransactionsAction(data.id, 'release')

  const actionBarList = [
    {
       title: data.status === 'In Progress' ? 'Release' : 'Delete',
       handleFn: () => data.status === 'In Progress'? release.mutate() : del.mutate()
    },
  ];

  const [theme] = useContext(ThemeContext)

  return (
    <div className={`item ${styles.item}`}>
      <span>{data.date}</span>
      <span>{data.id}</span>
      {data.type === 'coin' ? (
        <CoinSVG className={theme === 'dark' ? styles.coinDark : ''}/>
      ) : (
        <CardSVG className={theme === 'dark' ? styles.cardDark : ''}/>
      )}
      <span>{data.name}</span>
      <span>{data.value}</span>
      <span>{data.return}</span>
      <Status title={data.status} color={colorStatus(data.status)}/>
      <ActionsBar style={{right: '22px'}} width='73' list={actionBarList}/>
    </div>
  )
}