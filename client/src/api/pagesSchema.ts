import { z } from 'zod'

export const PagesSchema = z.object({
  first: z.number(),
  prev: z.union([z.number(), z.null()]),
  next: z.union([z.number(), z.null()]), 
  last: z.number(),
  pages: z.number(),
  items: z.number(),
})

export type TPages = z.infer<typeof PagesSchema>