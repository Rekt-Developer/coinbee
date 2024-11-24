import { useEffect, useState } from 'react'
import { TPages } from '../api/pagesSchema'

interface IUseViewMoreData<T> extends TPages {
  data: T[]
}

export const useViewMore = <T>(data: IUseViewMoreData<T> | undefined) => {
  const [allData, setAllData] = useState<T[]>(data?.data ?? []);
  const [isNext, setIsNext] = useState(true);

  useEffect(() => {
    if (data) {
      setAllData(prevData => {
         if (prevData.length == 0) {
          return [...prevData, ...data.data];
         } else if (data.prev != null) {
            return [...prevData, ...data.data];
         } else return [...data.data];
      });
      if (data.next) {
        setIsNext(true);
      } else {
        setIsNext(false);
      }
    }
}, [data])

return {allData, isNext}
}