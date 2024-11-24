import { CSSProperties, FC} from 'react'
import styles from './Status.module.scss'
import { TStatusColor } from '../../utils/statusColor'



type TStatus = {
  title: string
  color: TStatusColor
  style?: CSSProperties
}

export const Status: FC<TStatus> = ({title, color, style}) => { 
  return (
    <span className={styles.status} data-color= {color} style={style}>{title}</span>
  )
}