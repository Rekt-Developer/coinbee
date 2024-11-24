import axios from 'axios'
import { z } from 'zod'
import { API_URL } from './apiUrl'

const StatisticSchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number(),
})
export type TStatistic = z.infer<typeof StatisticSchema>

const StatisticArraySchema = z.array(StatisticSchema)
export type StatisticArray = z.infer<typeof StatisticArraySchema>

export function getStatistic(): Promise<StatisticArray> {
  return axios.get(`${API_URL}/statistics`)
   .then(res => res.data)
   .then(data => StatisticArraySchema.parse(data))
}