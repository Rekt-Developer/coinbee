import { FC, useEffect, useRef, useState } from 'react';
import { TotalCard } from './TotalCard';
import styles from './TotalCards.module.scss';
import { TActionBarList } from '../ActionsBar'
import { isContainsAll } from '../../utils/isContainsAll'
import { TTotalList } from '../../api/total'

type TTotalCardsProps = {
  gap?: string
  size?: 'sm'
  data: TTotalList
  widthActionBar?: string;
  showItems?: string[];
  actionsBarList?: TActionBarList[];
}

export const TotalCards: FC<TTotalCardsProps> = ({
  size,
  gap,
  data,
  widthActionBar,
  actionsBarList,
  showItems = ['']
}) => {
  const [items, setItems] = useState(data ?? []);
  const [isShowList, setIsShowList] = useState(false);
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data])

  useEffect(() => {
    if (showItems) {
      setItems(items => items.filter(item => !showItems.includes(item.id)));
    if( data && showItems.length !== 0  ) {
      const idList: string[] = [];
      data.forEach(item => idList.push(item.id))
      if (isContainsAll(showItems, idList)) {
        setIsShowList(true)
      }
    }
    }
  }, [data, setItems])
  

  if (isShowList) {
    return null;
  }


  return (
    <ul ref={listRef} className={styles.list} style={{gap: gap}} data-size={size}>
      {items.map(item => {
        return (
          <li key={item.id}>
            <TotalCard
              size={size}
              data={item}
              widthActionBar={widthActionBar}
              actionsBarList={actionsBarList}
            />
          </li>
        );
      })}
    </ul>
  );
};
