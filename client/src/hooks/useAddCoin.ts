import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../api/queryClient'
import { addCoin } from '../api/coin'

export const useAddCoin = () => {
  const coinMutation = useMutation({
    mutationFn: addCoin
  }, queryClient)

  return coinMutation
}