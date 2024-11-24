import { useQuery } from '@tanstack/react-query';
import { FC, useContext } from 'react';
import { queryClient } from '../../api/queryClient';
import { getStatistic } from '../../api/statistics';
import { BarDiagram } from '../../components/BarDiagram';
import { ConversionRateList } from '../../components/ConversionRateList/ConversionRateList';
import { OverviewSectionTrans } from '../../components/OverviewSectionTrans';
import { TotalCards } from '../../components/TotalCards/TotalCards';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { UserList } from '../../components/UserList';
import { useActionsBarOverview } from '../../hooks/useActionsBarOverview';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useTotalList } from '../../hooks/useTotalList';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { Button } from '../../ui/Button/Button';
import { Error } from '../../ui/Error/Error';
import { Icon } from '../../ui/Icon/Icon';
import { Loader } from '../../ui/Loader';
import './Overview.scss';
import { OverviewSection } from './OverviewSection/OverviewSection';
import { useGetCards } from '../../hooks/useGetCards'
import { LinkPlus } from '../../ui/LinkPlus/LinkPlus'
import { Card } from '../../components/Card'

type TOverview = {
  title: string;
};

export const Overview: FC<TOverview> = ({ title }) => {
  const [theme] = useContext(ThemeContext);
  const { showItems, setShowItems, actionsBarList, isLoading } =
    useActionsBarOverview();
  const widthActionBar = '63';

  const transactionsQuery = useGetTransactions(1, 4);
  const getCardsQuery = useGetCards(1, 5)

  const statisticQuery = useQuery(
    {
      queryKey: ['statistics'],
      queryFn: getStatistic,
    },
    queryClient
  );
  const totalListQuery = useTotalList('/totals', 'totalList');

  return (
    <>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <Icon name='calendar' isWhite={theme === 'dark'} />
      </div>
      <div className='overview-inner'>
        {isLoading
          ? null
          : totalListQuery.isSuccess && (
              <TotalCards
                data={totalListQuery.data}
                widthActionBar={widthActionBar}
                actionsBarList={actionsBarList}
                showItems={showItems}
              />
            )}

        {showItems.includes('200') || isLoading ? null : (
          <OverviewSection
            id='200'
            title='Conversion Rate to Naira'
            actionsBarList={actionsBarList}
            widthActionBar={widthActionBar}
          >
            <ConversionRateList />
          </OverviewSection>
        )}
        {showItems.includes('201') || isLoading ? null : (
          <OverviewSectionTrans
            id='201'
            title='Transactions'
            setShowItems={setShowItems}
            showItems={showItems}
          >
            Hi welcome, this page is the general overview section of the admin
            panel which you could edit and modify the view of the page to ya’
            preferred taste.
          </OverviewSectionTrans>
        )}
         {showItems.includes('202') || isLoading ? null : (
          <OverviewSection
            id='202'
            title='Cards'
            actionsBarList={actionsBarList}
            widthActionBar={widthActionBar}
            mb='40px'
          >
            <div className='cards-wrapp-overview'>
              <ul className='cards-list-overview'>
                {getCardsQuery.error && <Error title={getCardsQuery.error.message}/>}
                {getCardsQuery.isLoading && <Loader/>}
                {getCardsQuery.isSuccess && 
                  getCardsQuery.data.map((item) => (
                    <li key={item.id}>
                      <Card data={item}/>
                    </li>
                  ))
                }
              </ul>
              <LinkPlus size={52} link='/cards/add'/>
            </div>
            <div className='overview-btn-wrapp'>
              <Button link='/cards'>View More</Button>
            </div>
          </OverviewSection>
        )}
        {showItems.includes('204') || isLoading ? null : (
          <OverviewSection
            id='204'
            title='Users'
            actionsBarList={actionsBarList}
            widthActionBar={widthActionBar}
          >
            <UserList
              type='/users'
              withCheckbox={false}
              limit={5}
              currentPage={1}
            />
            <div className='overview-btn-wrapp'>
              <Button link='/users'>View More</Button>
            </div>
          </OverviewSection>
        )}
        {showItems.includes('205') || isLoading ? null : (
          <OverviewSection
            id='205'
            title='Statistics'
            actionsBarList={actionsBarList}
            widthActionBar={widthActionBar}
          >
            {statisticQuery.isLoading && <Loader />}
            {statisticQuery.error && (
              <Error title={statisticQuery.error.message} />
            )}
            {statisticQuery.isSuccess && (
              <BarDiagram
                label='Avarage Score'
                labels={statisticQuery.data?.map(data => data.name)}
                data={statisticQuery.data?.map(data => data.score)}
              />
            )}
          </OverviewSection>
        )}
        {showItems.includes('206') || isLoading ? null : (
          <OverviewSection
            id='206'
            title='Agents'
            actionsBarList={actionsBarList}
            widthActionBar={widthActionBar}
          >
            <UserList
              type='/agents'
              withCheckbox={false}
              limit={5}
              currentPage={1}
            />
            <div className='overview-btn-wrapp'>
              <Button link='/agents'>View More</Button>
            </div>
          </OverviewSection>
        )}

        {showItems.includes('208') || isLoading ? null : (
          <OverviewSection
            id='208'
            title='Payments'
            actionsBarList={actionsBarList}
            widthActionBar={widthActionBar}
          >
            <UserList
              type='/users-and-agents'
              withCheckbox={false}
              limit={4}
              currentPage={1}
            />
            <div className='overview-btn-wrapp'>
              <Button link='/payments'>View More</Button>
            </div>
          </OverviewSection>
        )}
        {showItems.includes('209') || isLoading ? null : (
          <OverviewSection
            id='209'
            title='Transactions'
            actionsBarList={actionsBarList}
            widthActionBar={widthActionBar}
          >
            {transactionsQuery.isLoading && <Loader />}
            {transactionsQuery.error && (
              <Error title={transactionsQuery.error.message} />
            )}
            {transactionsQuery.isSuccess && (
              <TransactionsList data={transactionsQuery.data.data} />
            )}
            <div className='overview-btn-wrapp'>
              <Button link='/transactions'>View More</Button>
            </div>
          </OverviewSection>
        )}
      </div>
    </>
  );
};
