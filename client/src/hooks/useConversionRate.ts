import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../api/queryClient'
import { getConversionRate } from '../api/conversionRate'

export const useConversionRate = () => {
  const conversionRateQuery = useQuery({
    queryKey: ['conversionRate'],
    queryFn: getConversionRate,
    retry: 0
  },queryClient)

  return conversionRateQuery;
}