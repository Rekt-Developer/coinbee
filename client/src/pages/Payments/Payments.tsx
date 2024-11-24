import { FC, useState } from 'react';
import { Button } from '../../ui/Button/Button';
import './Payments.scss';
import { Loader } from '../../ui/Loader'
import { Error } from '../../ui/Error/Error'
import { useGetPayments } from '../../hooks/useGetPayments'
import { PaymentsList } from '../../components/PaymentsList'
import { useViewMore } from '../../hooks/useVeiewMore'

type TPayments = {
  title: string;
};

export const Payments: FC<TPayments> = ({ title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsQuery = useGetPayments(currentPage, 10);
  const {allData, isNext} = useViewMore(paymentsQuery.data)

  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <p className='payments-filter'>FILTER</p>
      </div>
      <div className='section-inner payments-inner'>
        {paymentsQuery.isLoading && <Loader />}
        {paymentsQuery.error && (
          <Error title={paymentsQuery.error.message} />
        )}
        {paymentsQuery.isSuccess && (
          <div className='payments-wrapp'><PaymentsList data={allData} /></div>
        )}
        <span
          className='text'
          style={{ paddingLeft: '28px'}}
        >
          {paymentsQuery.data?.items} Transactions
        </span>
        <div className='overview-btn-wrapp'>
          <Button
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
