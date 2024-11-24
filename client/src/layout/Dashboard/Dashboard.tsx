import { useContext, useState } from 'react';
import { routes, TRoutes } from '../../const/routes';
import { ThemeContext } from '../../Providers/ThemeProvider';
import './Dashboard.scss';
import { DashboardLink } from './DashboardLink';

const dashboardLinks: TRoutes[] = routes;

export const Dashboard = () => {
  const [activeLink, setActiveLink] = useState('');
  const [theme] = useContext(ThemeContext);

  const handleLinkClick = (name: string) => {
    setActiveLink(name);
  };

  return (
    <aside className='dashboard'>
      <div className='dashboardWrapp'>
        {dashboardLinks.map(link => {
          return (
            <DashboardLink
              key={link.name}
              {...link}
              theme={theme}
              isActive={activeLink === link.name}
              handleClick={handleLinkClick}
            />
          );
        })}
      </div>
    </aside>
  );
};
