import { FC } from 'react'
import styles from './Coin.module.scss'
import { TCoin } from '../../api/coin'

type TCoinProps = {
  data: TCoin
}

export const Coin: FC<TCoinProps> = ({data}) => {
  return (
    <div className={styles.card} >
      <img src={data.image} alt={data.name} />
      <h3 className={styles.title}>{data.name}</h3>
    </div>
  )
}