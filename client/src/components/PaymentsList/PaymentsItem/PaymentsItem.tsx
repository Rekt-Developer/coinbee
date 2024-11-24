import { FC } from 'react';
import { TPaymentsItem } from '../../../api/payments';
import { Status } from '../../../ui/Status';
import { colorStatus } from '../../../utils/statusColor';
import { ActionsBar } from '../../ActionsBar';
import styles from './PaymentsItem.module.scss';
import { usePaymentsAction } from '../../../hooks/usePaymentsAction'

type TPaymentsItemProps = {
  data: TPaymentsItem;
};

export const PaymentsItem: FC<TPaymentsItemProps> = ({ data }) => {
  const del = usePaymentsAction(data.id, 'delete');
  const release = usePaymentsAction(data.id, 'release');

  const actionBarList = [
    {
      title: data.status === 'Paid' ? 'Delete' : 'Release',
      handleFn: () =>
        data.status === 'Paid' ? del.mutate() : release.mutate(),
    },
  ];

  return (
    <div className={`item ${styles.item}`}>
      <span>#{data.id}</span>
      <span>{data.type}</span>
      <span>#{data.amount}</span>
      <span>{data.date}</span>
      <Status title={data.status} color={colorStatus(data.status)} />
      <span className={styles.email}>{data.email}</span>
      <ActionsBar style={{ right: '22px' }} width='73' list={actionBarList} />
    </div>
  );
};
