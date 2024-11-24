import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../../../ui/Icon';
import styles from './DashboardLink.module.scss';

interface IDashboardLinkProps {
  name: string;
  title: string;
  isActive: boolean;
  count?: number;
  theme: string;
  handleClick: (name: string) => void;
}

export const DashboardLink: FC<IDashboardLinkProps> = ({
  name,
  title,
  isActive,
  count,
  theme,
  handleClick,
}) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes(name)) {
      handleClick(name);
    }
  }, [location, name, handleClick]);

  return (
    <div className={`${styles.link} ${isActive ? styles.active : ''}`}>
      <div className={styles.linkWrapp}>
        <Link className={styles.linkInner} to={'/' + name}>
          <div className={styles.linkInnerWrapp}>
            <Icon name={name} isWhite={isActive || theme === 'dark'} />
            <p className={isActive ? styles.linkTextActive : styles.linkText}>
              {title}
            </p>
          </div>
          {count && (
            <p className={styles.count}>
              <span>{count}</span>
            </p>
          )}
        </Link>
      </div>
    </div>
  );
};
