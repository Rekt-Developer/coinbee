import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessSVG from '../../../assets/img/successForm.svg?react';
import { Button } from '../../../ui/Button/Button';
import { Modal } from '../../../ui/Modal';
import { toUpperOne } from '../../../utils/toUpperOne';
import styles from './ModalSuccess.module.scss';

type TModalSuccessProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  type: 'card' | 'coin';
};

export const ModalSuccess: FC<TModalSuccessProps> = ({
  isActive,
  setIsActive,
  type,
}) => {
  const lowerType = type;
  const upperType = toUpperOne(type);

  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsActive(false);
    navigate(`/${type}s`);
  };

  return (
    <Modal isActive={isActive} setIsActive={setIsActive}>
      <div className={styles.inner}>
        <SuccessSVG className={styles.svg} />
        <h3>{upperType} Successfully Added</h3>
        <p>
          {upperType} has been successfully added to the {lowerType} list and
          user can make transactions with this asap!
        </p>
        <Button onClick={handleSuccess}>Proceed to {upperType}s</Button>
      </div>
    </Modal>
  );
};
