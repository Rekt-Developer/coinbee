import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../api/queryClient'
import { addCard } from '../api/cards'

export const useAddCard = () => {
  const cardMutation = useMutation({
    mutationFn: addCard
  }, queryClient)

  return cardMutation
}