import styles from './LinkPlus.module.scss'
import PlusSVG from '../../assets/img/plus.svg?react'
import { Link } from 'react-router-dom';
import { FC } from 'react'

type TLinkPlus = {
  size: number;
  link: string;
}

export const LinkPlus:FC<TLinkPlus> = ({size, link}) => {
  return (
    <Link className={styles.linkPlus} to={link}>
      <PlusSVG width={size} height={size}/>
    </Link>
  )
}