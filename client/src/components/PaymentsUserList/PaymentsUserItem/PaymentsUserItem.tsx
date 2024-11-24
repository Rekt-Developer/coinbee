import { FC, useState } from 'react';
import { Status } from '../../../ui/Status';
import { colorStatus } from '../../../utils/statusColor';
import { ActionsBar } from '../../ActionsBar';
import styles from './PaymentsUserItem.module.scss';
import { TPaymentUser } from '../../../api/paymentUser'
import { ProductValue } from '../../../ui/ProductValue'
import { ModalPayment } from '../../Modal/ModalPayment'

type TPaymentsUserItemProps = {
  data: TPaymentUser;
};

export const PaymentsUserItem: FC<TPaymentsUserItemProps> = ({ data }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const actionBarList = [
    {
      title: 'Payment Details',
      handleFn: () =>
        setIsModalActive(true)
    },
  ];

  return (
    <div className={`item ${styles.item}`}>
      <span>{data.id}</span>
      <span>{data.date}</span>
      <ProductValue count={data.productPrice} product={data.product}/>
      <span>#{data.amounts}</span>
      <Status title={data.status} color={colorStatus(data.status)} />
      <ActionsBar style={{ right: '34px' }} width='97' list={actionBarList} />
      <ModalPayment data={data} isActive= {isModalActive} setIsActive = {setIsModalActive}/>
    </div>
  );
};
