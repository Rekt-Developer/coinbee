import { FC } from 'react'
import styles from './ProductValue.module.scss'

type TProductValueProps = {
  count: string;
  product: string;
  size?: 'sm'
}

export const ProductValue: FC<TProductValueProps> = ({count, product, size}) => {
  let value = `$${count}-`

  if (product == 'Bitcoin') value= `${count}Btc-`
  if (product == 'Ethereum') value= `${count}Eth-`
  return (
    <p className={styles.value} data-size={size}>
        <span className={styles.count}>{value}</span>
        {product == 'Bitcoin' || product == 'Ethereum' ? '' : < br/>}
        <span className={styles.name}>{product}</span>
    </p>
  )
}