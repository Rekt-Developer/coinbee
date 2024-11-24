import { FC } from 'react';
import { AuthForm } from '../../components/Account/AuthForm/AuthForm';
import './Logout.scss';

type TLogout = {
  title: string;
};

export const Logout: FC<TLogout> = ({ title }) => {
  return (
    <section>
      <div className='main-title-wrapp overview-title-wrapp'>
        <h1 className='main-title'>{title}</h1>
      </div>
      <div className='section-inner logout-inner'>
        <div className='logout-form-inner'>
          <h2>You’re bout to logout of the system</h2>
          <AuthForm title='logout' />
        </div>
      </div>
    </section>
  );
};
