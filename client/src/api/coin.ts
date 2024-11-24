import axios from 'axios'
import { z } from 'zod'
import { API_URL } from './apiUrl'

const CoinSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  image: z.string(),
})
export type TCoin = z.infer<typeof CoinSchema>

const CoinListSchema = z.array(CoinSchema)
type TCoinList = z.infer<typeof CoinListSchema>

export function getCoins(page: number, limit:number): Promise<TCoinList> {
  if (page !== 0 || limit !== 0) {
    return axios.get(`${API_URL}/coins/?_page=${page}&_per_page=${limit}`)
   .then(res => res.data.data)   
   .then(data => CoinListSchema.parse(data))
  }
  return axios.get(`${API_URL}/coins/?_page=${page}&_per_page=${limit}`)
   .then(res => res.data)   
   .then(data => CoinListSchema.parse(data))
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

type TAddCoinProps = {
  id: string;
  name: string;
  code: string;
  image: File;
}

export async function addCoin({id, name, code, image}: TAddCoinProps) {
  try {
    // Сначала загружаем фотографию
    const imageUrl = await uploadPhoto(image);

    // Затем отправляем остальные данные вместе с URL загруженной фотографии
    const response = await axios.post(`${API_URL}/coins`, {
      id,
      name,
      code,
      image: imageUrl
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file or adding Coin:', error);
    throw error;
  }
}