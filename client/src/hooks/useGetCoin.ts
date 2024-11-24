import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../api/queryClient'
import { getCoins } from '../api/coin'

export const useGetCoin = (page: number, limit: number) => {
  const getCoinsQuery = useQuery({          
    queryKey: ['coins', page],
    queryFn: () => getCoins(page, limit),
  }, queryClient)

  return getCoinsQuery
}