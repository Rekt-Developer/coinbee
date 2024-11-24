import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteSVG from '../../assets/img/deleteOverviewSectionTrans.svg?react';
import { Button } from '../../ui/Button/Button';
import styles from './OverviewSectionTrans.module.scss';

type TOverviewSectionTransProps = {
  id: string;
  title: string;
  children: string;
  setShowItems: (items: string[]) => void;
  showItems: string[];
};

export const OverviewSectionTrans: FC<TOverviewSectionTransProps> = ({
  id,
  title,
  children,
  setShowItems,
  showItems,
}) => {
  const navigate = useNavigate();


  const handleToTransactions = () => {
    navigate('/transactions', { replace: true });
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2>{title}</h2>
        <p>{children}</p>
        <Button
          style={{ minWidth: '134px', position: 'relative' }}
          colorTheme='white'
          onClick={handleToTransactions}
        >
          Learn More
        </Button>
      </div>
      <DeleteSVG
        className={styles.deleteIcon}
        onClick={() => {
          setShowItems([...showItems, id]);
        }}
      />
    </section>
  );
};
