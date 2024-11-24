import { FC } from 'react';
import { Search } from '../../components/Search';
import { Error } from '../../ui/Error/Error';
import { LinkPlus } from '../../ui/LinkPlus/LinkPlus';
import { Loader } from '../../ui/Loader';
import './Coins.scss';
import { Button } from '../../ui/Button/Button'
import AddCoinSVG from '../../assets/img/addCoin.svg?react'
import { Coin } from '../../components/Coin'
import { useGetCoin } from '../../hooks/useGetCoin'

type TCoins = {
  title: string;
};

export const Coins: FC<TCoins> = ({ title }) => {
  const getCoinsQuery = useGetCoin(0, 0);
  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <div className='cards-actions-wrapp'>
          <Search size='sm' placeholder='Search Cards' />
          <Button link='/coins/add'>
          <AddCoinSVG/>
            Add Coin
          </Button>
        </div>
      </div>
      <div className='section-inner '>
        <ul className='coins-list'>
          {getCoinsQuery.error && <Error title={getCoinsQuery.error.message} />}
          {getCoinsQuery.isLoading && <Loader />}
          {getCoinsQuery.isSuccess &&
            getCoinsQuery.data.map(item => (
              <li key={item.id}>
                <Coin data={item} />
              </li>
            ))}
          <li className='cards-item-link'>
            <LinkPlus size={70} link='/coins/add' />
          </li>
        </ul>
      </div>
    </section>
  );
};
