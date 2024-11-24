import axios from 'axios'
import { z } from 'zod'
import { API_URL } from './apiUrl'

const CardSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  type: z.string(),
  currency: z.string(),
  image: z.string(),
})
export type TCard = z.infer<typeof CardSchema>

const CardListSchema = z.array(CardSchema)
type TCardList = z.infer<typeof CardListSchema>

export function getCards(page: number, limit:number): Promise<TCardList> {
  if (page !== 0 || limit !== 0) {
    return axios.get(`${API_URL}/cards/?_page=${page}&_per_page=${limit}`)
   .then(res => res.data.data)   
   .then(data => CardListSchema.parse(data))
  }
  return axios.get(`${API_URL}/cards/?_page=${page}&_per_page=${limit}`)
   .then(res => res.data)   
   .then(data => CardListSchema.parse(data))
}

export const uploadPhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('http://localhost:5000/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.url;
};

type TAddCardProps = {
  id: string;
  name: string;
  country: string;
  currency: string;
  type: string;
  image: File;
}

export async function addCard({id, name, country, currency, type, image}: TAddCardProps) {
  try {
    // Сначала загружаем фотографию
    const imageUrl = await uploadPhoto(image);

    // Затем отправляем остальные данные вместе с URL загруженной фотографии
    const response = await axios.post(`${API_URL}/cards`, {
      id,
      name,
      country,
      currency,
      type,
      image: imageUrl
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file or adding card:', error);
    throw error;
  }
}