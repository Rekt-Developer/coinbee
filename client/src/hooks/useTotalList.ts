import { useQuery } from '@tanstack/react-query'
import { getTotalList } from '../api/total'
import { queryClient } from '../api/queryClient'

export const useTotalList = (url: string, key: string) => {
  const totalListQuery = useQuery({
    queryKey: [key],
    queryFn: () => getTotalList(url),
    retry: 0
  }, queryClient)

  return totalListQuery
}