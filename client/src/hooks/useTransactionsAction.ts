import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../api/queryClient'
import { deleteTransaction, releaseTransaction } from '../api/transactions'

export const useTransactionsAction = (id: string, type: 'delete' | 'release') => {
  const transactionsMutation = useMutation({
    mutationFn: () => {
      if (type === 'delete') {
        return deleteTransaction(id)
      } else  {
        return releaseTransaction(id)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['transactions']})
    }
  }, queryClient)


  return transactionsMutation
}