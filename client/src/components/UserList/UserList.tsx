import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { queryClient } from '../../api/queryClient';
import { getUsers, TGetUserProps } from '../../api/users';
import { Checkbox } from '../../ui/Checkbox';
import { Error } from '../../ui/Error/Error';
import { Loader } from '../../ui/Loader';
import { UserItem } from './../UserItem/UserItem';
import styles from './UserList.module.scss';
import { useViewMore } from '../../hooks/useVeiewMore'

type TUserList = {
  currentPage: number;
  setTotal?: (t: number) => void;
  setIsNext?: (t: boolean) => void;
  type: TGetUserProps;
  withCheckbox: boolean;
  limit?: number;
  style?: CSSProperties;
};

export const UserList: FC<TUserList> = ({
  limit = 9,
  type,
  withCheckbox,
  style,
  setIsNext,
  setTotal,
  currentPage,
}) => {
  const userQuery = useQuery(
    {
      queryKey: [type, currentPage],
      queryFn: () => getUsers(type, currentPage, limit),
      placeholderData: keepPreviousData,
    },
    queryClient
  );

  const {allData, isNext} = useViewMore(userQuery.data)

  useEffect(() => {
    if (userQuery.data) {
      if (setTotal) {
        setTotal(userQuery.data.items);
      }
      if (setIsNext ) {
        setIsNext(isNext);
      }
    }
    
  }, [
    userQuery.data,
    setTotal,
    isNext,
    setIsNext
  ]);

  let list: string[] = ['Account Status', 'User Name', 'Email', 'Action'];
  if (type === '/users-and-agents') {
    list = ['Payment Status', 'User/Agent', 'Email', 'Action'];
  }

  const [checked, setChecked] = useState(false);

  function handleChecked() {
    setChecked(!checked);
  }

  return (
    <div style={style}>
      <ul
        className={`${styles.headerList} ${
          withCheckbox ? styles.checkbox : ''
        }`}
      >
        {withCheckbox && (
          <li>
            <Checkbox checked={checked} handleChecked={handleChecked} />
          </li>
        )}
        {list.map(item => (
          <li key={item}>
            <h3>{item}</h3>
          </li>
        ))}
      </ul>
      {userQuery.isLoading && (
        <div className='center'>
          <Loader />
        </div>
      )}
      {userQuery.isError && (
        <div className='center'>
          <Error title={userQuery.error.message} />
        </div>
      )}
      {userQuery.isSuccess && (
        <ul className={styles.list}>
          {allData.map(user => (
            <li key={user.id}>
              <UserItem
                data={user}
                withCheckbox={withCheckbox}
                type={type}
                isChecked={checked}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
