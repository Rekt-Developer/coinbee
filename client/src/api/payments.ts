import { z } from 'zod'
import { API_URL } from './apiUrl'
import axios from 'axios'
import { PagesSchema } from './pagesSchema'

const PaymentsItemSchema = z.object({
  id: z.string(),
  type: z.string(z.enum(['Agent', 'User'])),
  amount: z.string(),
  date: z.string(),
  status: z.string(),
  email: z.string(),
})
export type TPaymentsItem = z.infer<typeof PaymentsItemSchema>

const PaymentsListSchema = z.array(PaymentsItemSchema)
export type TPaymentsList = z.infer<typeof PaymentsListSchema>

const PaymentsGetSchema = PagesSchema.extend({
  data: PaymentsListSchema
})
type TPaymentsGet = z.infer<typeof PaymentsGetSchema>

export const getPayments = (page: number, limit: number): Promise<TPaymentsGet> => {
  return axios.get(`${API_URL}/payments/?_page=${page}&_per_page=${limit}`)
   .then(res => res.data)
   .then(data => PaymentsGetSchema.parse(data))
}

export const releasePayments = (id: string): Promise<void> => {
  return axios.patch(`${API_URL}/payments/${id}`, {
    status: 'Paid'
  })
}

export const deletePayments = (id: string): Promise<void> => {
  return axios.delete(`${API_URL}/payments/${id}`)
}