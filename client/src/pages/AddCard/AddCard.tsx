import { FC } from 'react';
import { Search } from '../../components/Search';
import './AddCard.scss';
import { Button } from '../../ui/Button/Button'
import AddSVG from '../../assets/img/addCard.svg?react'
import { FormCard } from '../../components/FormCard/FormCard'

type TCards = {
  title: string;
};

export const AddCard: FC<TCards> = ({ title }) => {
  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <div className='cards-actions-wrapp'>
          <Search size='sm' placeholder='Search Cards' />
          <Button type='submit' form = 'cardForm'>
            <AddSVG/>
            Add card
          </Button>
        </div>
      </div>
      <div className='section-inner add-card-inner'>
        <FormCard/>
      </div>
    </section>
  );
};
