import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TConversionRate } from '../../../api/conversionRate';
import styles from './ConversionRateItem.module.scss';

type TConversionRateItemProps = {
  data: TConversionRate;
};

export const ConversionRateItem: FC<TConversionRateItemProps> = ({ data }) => {
  return (
    <div className={styles.wrapp}>
      <h3>{data.title}</h3>
      <ul className={styles.list}>
        {data.items.map(item => (
          <li className={styles.item} key={uuidv4()}>
            <span>{item.name}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
