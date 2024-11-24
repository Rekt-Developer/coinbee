import { z } from 'zod'
import { API_URL } from './apiUrl'
import axios from 'axios'
import { PagesSchema } from './pagesSchema'

const TransactionsItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.string(z.enum(['card', 'coin'])),
  name: z.string(),
  value: z.string(),
  return: z.string(),
  status: z.string(),
})
export type TTransactionsItem = z.infer<typeof TransactionsItemSchema>

const TransactionsListSchema = z.array(TransactionsItemSchema)
export type TTransactionsList = z.infer<typeof TransactionsListSchema>

const TransactionsGetSchema = PagesSchema.extend({
  data: TransactionsListSchema
})
type TTransactionsGet = z.infer<typeof TransactionsGetSchema>

export const getTransactions = (page: number, limit: number): Promise<TTransactionsGet> => {
  return axios.get(`${API_URL}/transactions/?_page=${page}&_per_page=${limit}`)
   .then(res => res.data)
   .then(data => TransactionsGetSchema.parse(data))
}

export const releaseTransaction = (id: string): Promise<void> => {
  return axios.patch(`${API_URL}/transactions/${id}`, {
    status: 'Completed'
  })
}

export const deleteTransaction = (id: string): Promise<void> => {
  return axios.delete(`${API_URL}/transactions/${id}`)
}