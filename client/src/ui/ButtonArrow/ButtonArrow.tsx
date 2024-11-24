import styles from './ButtonArrow.module.scss'
import ArrowSVG from '../../assets/img/arrow.svg?react'
import { FC } from 'react'

type TButtonArrowProps = {
  type?: 'left' | 'right'
  handleClick: () => void;
  isDisabled?: boolean;
}

export const ButtonArrow: FC<TButtonArrowProps> = ({type, handleClick, isDisabled}) => {
  return <button className={styles.button} onClick={handleClick} disabled={isDisabled}>
    <ArrowSVG className={`${styles.buttonArrow} ${type === 'left' ? styles.left : ''}`}/> 
  </button>
  
}