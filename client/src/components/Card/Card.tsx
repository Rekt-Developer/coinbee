import { FC } from 'react'
import { TCard } from '../../api/cards'
import styles from './Card.module.scss'

type TCardProps = {
  data: TCard
}

export const Card: FC<TCardProps> = ({data}) => {
  return (
    <div className={styles.card} title={data.name} data-country={data.country}>
      <img src={data.image} alt={data.name} />
      <h3 className={`${styles.title} ${data.type === 'Other Cards' || data.type === 'Google Play Card' ? styles.gray : ''}` }>{data.type}</h3>
    </div>
  )
}