import { z } from 'zod'
import { API_URL } from './apiUrl'
import axios from 'axios'

const PaymentUserSchema = z.object({
  id: z.string(),
  date: z.string(),
  product: z.string(),
  productPrice: z.string(),
  rate: z.string(),
  return: z.string(),
  amounts: z.string(),
  bank: z.string(),
  card: z.string(),
  status: z.string(),
})
export type TPaymentUser = z.infer<typeof PaymentUserSchema>

const PaymentUserListSchema = z.array(PaymentUserSchema)
export type TPaymentUserList = z.infer<typeof PaymentUserListSchema>

export const getPaymentUser = (): Promise<TPaymentUserList> => {
  return axios.get(`${API_URL}/payment-user`)
   .then(res => res.data)
   .then(data => PaymentUserListSchema.parse(data))
}