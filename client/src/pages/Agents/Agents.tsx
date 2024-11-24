import { FC, useState } from 'react';
import { Search } from '../../components/Search';
import { UserList } from '../../components/UserList';
import { Button } from '../../ui/Button/Button';
import './Agents.scss';

type TAgents = {
  title: string;
};

export const Agents: FC<TAgents> = ({ title }) => {
  const [isNext, setIsNext] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
        <Search size='md' placeholder='Search Agent' />
      </div>
      <div className='section-inner users-inner'>
        <UserList
          style={{ marginBottom: '20px' }}
          type='/agents'
          withCheckbox={true}
          limit={9}
          setIsNext={setIsNext}
          setTotal={setTotal}
          currentPage={currentPage}
        />
        <span
          className='text'
          style={{ paddingLeft: '28px', marginTop: '28px' }}
        >
          {total} Agents
        </span>
        <div className='overview-btn-wrapp'>
          <Button isDisabled={!isNext} onClick={() => setCurrentPage(currentPage + 1)}>View More</Button>
        </div>
      </div>
    </section>
  );
};
