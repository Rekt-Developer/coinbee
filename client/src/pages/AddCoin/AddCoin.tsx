import { FC } from 'react';
import { Search } from '../../components/Search';
import './AddCoin.scss';
import { Button } from '../../ui/Button/Button'
import AddCoinSVG from '../../assets/img/addCoin.svg?react'
import { FormCoin } from '../../components/FormCoin'

type TCoin = {
  title: string;
};

export const AddCoin: FC<TCoin> = ({ title }) => {
  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <div className='cards-actions-wrapp'>
          <Search size='sm' placeholder='Search Cards' />
          <Button type='submit' form = 'coinForm'>
            <AddCoinSVG/>
            Add coin
          </Button>
        </div>
      </div>
      <div className='section-inner add-card-inner'>
        <FormCoin/>
      </div>
    </section>
  );
};
