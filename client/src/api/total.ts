import axios from 'axios'
import { z } from 'zod'
import { API_URL } from './apiUrl'

export const TotalSchema = z.object({
  id: z.string(),
  title: z.string(),
  count: z.string(),
  precent: z.number(),
  trend: z.boolean(),
})
export type TTotal = z.infer<typeof TotalSchema>

export const TotalListSchema = z.array(TotalSchema)
export type TTotalList = z.infer<typeof TotalListSchema>

export  const getTotalList = (url: string): Promise<TTotalList> => {
  return axios.get(`${API_URL}${url}`)
  .then(res => res.data)
  .then(data => TotalListSchema.parse(data))
}