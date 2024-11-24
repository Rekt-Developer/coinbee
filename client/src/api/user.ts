import axios from 'axios'
import { z } from 'zod';
export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export type UserParams = {
  email: string;
  password: string;
}

export function registerUser({email, password}: UserParams): Promise<void> {
  return axios.post(`api/register`, {email: email, password: password})
}


export function loginUser(data: UserParams): Promise<void> {
  return axios.post('api/login', data)
}

export function logoutUser(): Promise<void> {
  return axios.post('api/logout')
}

export function fetchMe(): Promise<User> {
  return axios.get(`api/users/me`).then(res => res.data)
}
