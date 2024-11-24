import { TPaymentUser } from '../../../api/paymentUser';
import { Modal } from '../../../ui/Modal';
import { ProductValue } from '../../../ui/ProductValue';
import styles from './ModalPayment.module.scss';
import PaymentCardSVG from '../../../assets/img/paymentCard.svg?react'
import { FC } from 'react'

type TModalPaymentProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  data: TPaymentUser;
};

export const ModalPayment: FC<TModalPaymentProps> = ({ isActive, setIsActive, data }) => {
  return (
    <Modal isActive={isActive} setIsActive={setIsActive}>
      <div className={styles.inner}>
        <h2>Payment Details</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.itemName}>Products</span>
            <ProductValue
              count={data.productPrice}
              product={data.product}
              size='sm'
            />
          </li>
          <li className={styles.item}>
            <span className={styles.itemName}>Exchange Rate</span>
            <p className={styles.valueRate}>
              <span className={styles.countRate}>#{data.rate}</span>
              <br />
              <span className={styles.nameRate}>per dollar</span>
            </p>
          </li>
          <li className={styles.item}>
            <span className={styles.itemName}>Return</span>
            <span className={styles.return}>#{data.return}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.itemName}>Date</span>
            <span className={styles.date}>{data.date}</span>
          </li>
        </ul>
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <h3>{data.bank}</h3>
            <p>{data.card} XXXX-XXXX-XXX</p>
            <span>Shedrack Rose Neima</span>
          </div>
          <PaymentCardSVG />
        </div>
      </div>
    </Modal>
  );
};
