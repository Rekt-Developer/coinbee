import { FC } from 'react'
import BlockSVG from '../../../assets/img/blockModal.svg?react';
import { Button } from '../../../ui/Button/Button'
import { Modal } from '../../../ui/Modal';
import styles from './ModalBlock.module.scss';

type TModalBlockProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  handleBlock: () => void;
  isLoading: boolean;
};

export const ModalBlock: FC<TModalBlockProps> = ({ isActive, setIsActive, handleBlock, isLoading }) => {
  return (
    <Modal isActive={isActive} setIsActive = {setIsActive}>
      <div className={styles.inner}>
        <BlockSVG />
        <h3>Block User?</h3>
        <p>
          Clicking the proceed button will deny user access into the entire
          system proceed?
        </p>
        <Button isLoading={isLoading} onClick={handleBlock}>Proceed</Button>
      </div>
    </Modal>
  );
};
