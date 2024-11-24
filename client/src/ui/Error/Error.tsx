import { FC } from 'react'
import styles from './Error.module.scss'

type TErrorProps = {
  title: string;
  color?: 'red' | 'pomidoro';
  isBackground?: 'true';
  fontSize?: string;  // example: '14px' or '1rem'
}

export const Error: FC<TErrorProps> = ({title, color, isBackground, fontSize}) => {
  return <span style={{fontSize: fontSize + 'px'}} className={styles.error} data-color={color} data-background={isBackground}>{title}</span>
}