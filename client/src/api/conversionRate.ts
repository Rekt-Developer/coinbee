import axios from 'axios';
import { z } from 'zod';
import { API_URL } from './apiUrl';

export const ConversionRateItemsSchema = z.object({
  name: z.string(),
  value: z.string(),
});
export type TConversionRateItems = z.infer<typeof ConversionRateItemsSchema>;

const ConversionRateSchema = z.object({
  title: z.string(),
  items: z.array(ConversionRateItemsSchema),
});

export type TConversionRate = z.infer<typeof ConversionRateSchema>;

export const ConversionRateListSchema = z.array(ConversionRateSchema);

export type TConversionRateList = z.infer<typeof ConversionRateListSchema>;

export function getConversionRate(): Promise<TConversionRateList> {
  return axios
    .get(`${API_URL}/conversion-rate`)
    .then(res => res.data)
    .then(data => ConversionRateListSchema.parse(data));
}
