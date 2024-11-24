import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../api/queryClient'
import { deletePayments, releasePayments } from '../api/payments'

export const usePaymentsAction = (id: string, type: 'delete' | 'release') => {
  const paymentsMutation = useMutation({
    mutationFn: () => {
      if (type === 'delete') {
        return deletePayments(id)
      } else  {
        return releasePayments(id)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['payments']})
    }
  }, queryClient)


  return paymentsMutation
}