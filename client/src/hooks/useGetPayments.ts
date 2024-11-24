import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { queryClient } from '../api/queryClient'
import { getPayments } from '../api/payments'

export const useGetPayments = (page: number, limit: number) => {
  const getPaymentsQuery = useQuery({
    queryKey: ['payments', page],
    queryFn: () => getPayments(page, limit),
    placeholderData: keepPreviousData
  }, queryClient)

  return getPaymentsQuery
}