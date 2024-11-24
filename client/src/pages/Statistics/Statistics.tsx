import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { queryClient } from '../../api/queryClient';
import { getStatistic } from '../../api/statistics';
import CalendarSVG from '../../assets/img/calendar.svg?react';
import { BarDiagram } from '../../components/BarDiagram';
import { Error } from '../../ui/Error/Error';
import { Loader } from '../../ui/Loader';
import './Statistics.scss';

type TStatistics = {
  title: string;
};

export const Statistics: FC<TStatistics> = ({ title }) => {
  const statisticQuery = useQuery(
    {
      queryKey: ['statistics'],
      queryFn: getStatistic,
    },
    queryClient
  );
  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <CalendarSVG />
      </div>
      <div className='section-inner statistics-inner'>
        {statisticQuery.isLoading && <Loader />}
        {statisticQuery.error && <Error title={statisticQuery.error.message} />}
        {statisticQuery.isSuccess && (
          <BarDiagram
            label='Avarage Score'
            labels={statisticQuery.data?.map(data => data.name)}
            data={statisticQuery.data?.map(data => data.score)}
          />
        )}
      </div>
    </section>
  );
};
