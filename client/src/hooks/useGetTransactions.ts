import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { queryClient } from '../api/queryClient'
import { getTransactions } from '../api/transactions'

export const useGetTransactions = (page: number, limit: number) => {
  const getTransactionsQuery = useQuery({
    queryKey: ['transactions', page],
    queryFn: () => getTransactions(page, limit),
    placeholderData: keepPreviousData
  }, queryClient)

  return getTransactionsQuery
}