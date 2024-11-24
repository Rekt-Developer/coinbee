import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routes, TRoutes } from '../../const/routes';
import './Main.scss';
import { User } from '../../pages/User'
import { AddCard } from '../../pages/AddCard'
import { AddCoin } from '../../pages/AddCoin'
import { useNavigate } from 'react-router-dom'

const pages: TRoutes[] = routes;

export const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate('overview')
  },[])

  const [title, setTitle] = useState('');

  useEffect(() => {
    const page = pages.find(page => location.pathname.includes(page.path()));
    if (page) {
      setTitle(page.title);
    }
    if (location.pathname.includes('/user/')) {
      setTitle('Users');
    }
  }, [location.pathname]);

  return (
    <main className='main'>
      <div className='container'>
        {title && (
          <div className='main-head'>
            <h2 className='main-head__title'>Admin Management {title}</h2>
            <div className='main-head__wrapp'>
              <p>Accounts</p>
              <p>COINBASE</p>
            </div>
          </div>
        )}
        <Routes>
          {pages.map(page => {
            return (
              <Route
                key={page.path()}
                path={page.path()}
                element={page.component()}
              />
            );
          })}
          <Route path='/user/:id' element={<User/>}/>
          <Route path='/cards/add' element={<AddCard title='Add Card'/>}/>
          <Route path='/coins/add' element={<AddCoin title='Bitcoin & Ethereum'/>}/>
        </Routes>
      </div>
    </main>
  );
};
