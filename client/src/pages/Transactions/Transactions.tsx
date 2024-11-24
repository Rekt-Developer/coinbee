import { FC, useState } from 'react';
import { Search } from '../../components/Search';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { Button } from '../../ui/Button/Button';
import './Transactions.scss';
import { Loader } from '../../ui/Loader'
import { Error } from '../../ui/Error/Error'
import { useViewMore } from '../../hooks/useVeiewMore'

type TTransactions = {
  title: string;
};

export const Transactions: FC<TTransactions> = ({ title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsQuery = useGetTransactions(currentPage, 9);
  const {allData, isNext} = useViewMore(transactionsQuery.data)

  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <Search size='md' placeholder='Search Transactions' />
      </div>
      <div className='section-inner transactions-inner'>
        {transactionsQuery.isLoading && <Loader />}
        {transactionsQuery.error && (
          <Error title={transactionsQuery.error.message} />
        )}
        {transactionsQuery.isSuccess && (
          <div className='transactions-wrapp'><TransactionsList data={allData} /></div>
        )}
        <span
          className='text'
          style={{ paddingLeft: '28px'}}
        >
          {transactionsQuery.data?.items} Transactions
        </span>
        <div className='overview-btn-wrapp'>
          <Button
            colorTheme='white'
            isDisabled={!isNext}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            View More
          </Button>
        </div>
      </div>
    </section>
  );
};
