import { FC, HTMLAttributes } from 'react';
import SearchLogo from '../../assets/img/search.svg?react';
import styles from './Search.module.scss';

interface ISearchProps extends HTMLAttributes<HTMLInputElement> {
  size?: 'lg' | 'md' | 'sm';
  placeholder?: string;
}

export const Search: FC<ISearchProps> = ({ size, placeholder, ...props }) => {
  return (
    <div className={styles.searhWrapp} data-size={size}>
      <input
        type='text'
        className={styles.search}
        placeholder={placeholder}
        {...props}
      />
      <SearchLogo className={styles.searchLogo} stroke='var(--color-text)'/>
    </div>
  );
};
