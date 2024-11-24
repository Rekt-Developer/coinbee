import { FC } from 'react';
import { Card } from '../../components/Card';
import { Search } from '../../components/Search';
import { useGetCards } from '../../hooks/useGetCards';
import { Error } from '../../ui/Error/Error';
import { LinkPlus } from '../../ui/LinkPlus/LinkPlus';
import { Loader } from '../../ui/Loader';
import './Cards.scss';
import { Button } from '../../ui/Button/Button'
import AddSVG from '../../assets/img/addCard.svg?react'

type TCards = {
  title: string;
};

export const Cards: FC<TCards> = ({ title }) => {
  const getCardsQuery = useGetCards(0, 0);
  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <div className='cards-actions-wrapp'>
          <Search size='sm' placeholder='Search Cards' />
          <Button link='/cards/add'>
            <AddSVG/>
            Add card
          </Button>
        </div>
      </div>
      <div className='section-inner '>
        <ul className='cards-list'>
          {getCardsQuery.error && <Error title={getCardsQuery.error.message} />}
          {getCardsQuery.isLoading && <Loader />}
          {getCardsQuery.isSuccess &&
            getCardsQuery.data.map(item => (
              <li key={item.id}>
                <Card data={item} />
              </li>
            ))}
          <li className='cards-item-link'>
            <LinkPlus size={70} link='/cards/add' />
          </li>
        </ul>
      </div>
    </section>
  );
};
