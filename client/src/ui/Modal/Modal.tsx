import styles from './Modal.module.scss'
import CloseSVG from '../../assets/img/close.svg?react'
import { FC, MouseEvent, useState } from 'react'

type TModalProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  children: JSX.Element;
}

export const Modal: FC<TModalProps> = ({isActive, setIsActive, children}) => {

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsActive(false)
    }
  };

  return (
    isActive && <div className={styles.modal} onClick={handleOverlayClick}>
      <div className={styles.content}>
        <CloseSVG className={styles.close} onClick={() => setIsActive(false)}/>
        {children}
        </div>
    </div>
  )
}