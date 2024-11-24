import { FC } from 'react';
import { ActionsBar, TActionBarList } from '../../ActionsBar';
import { TotalProgressBar } from '../../TotalProgressBar';
import styles from './TotalCard.module.scss';
import { TTotal } from '../../../api/total'


export type TTotalCardProps = {
  widthActionBar?: string;
  actionsBarList?: TActionBarList[];
}
interface ITotalCardProps extends TTotalCardProps{
  data: TTotal
  size?: 'sm'
}



export const TotalCard: FC<ITotalCardProps> = ({
  size,
  data,
  widthActionBar = '61px',
  actionsBarList,
}) => {
  return (
    <div className={styles.totalCard} data-size={size}>
      <div className={styles.totalWrapp}>
        <TotalProgressBar count={data.count} />
        <div className={styles.totalInner}>
          <h3>{data.title}</h3>
          <p className={data.trend ? '' : styles.trendDown}>{data.precent}%</p>
        </div>
      </div>
      {actionsBarList && <ActionsBar
        id={data.id}
        width={widthActionBar}
        list={actionsBarList}
        style={{ top: '22px', right: '22px' }}
      />}
    </div>
  );
};
