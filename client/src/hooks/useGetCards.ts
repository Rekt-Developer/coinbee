import { useQuery } from '@tanstack/react-query'
import { getCards } from '../api/cards'
import { queryClient } from '../api/queryClient'

export const useGetCards = (page: number, limit: number) => {
  const getCardsQuery = useQuery({          
    queryKey: ['cards', page],
    queryFn: () => getCards(page, limit),
  }, queryClient)

  return getCardsQuery
}