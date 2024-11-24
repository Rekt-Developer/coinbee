import axios from 'axios';
import { z } from 'zod';
import { API_URL } from './apiUrl';
import { PagesSchema } from './pagesSchema'

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string(),
  status: z.string(),
  block: z.boolean(),
  role: z.enum(['User', 'Agent']).optional(),
});
export type TUser = z.infer<typeof UserSchema>;

const UserListSchema = z.array(UserSchema);
export type TUserList = z.infer<typeof UserListSchema>;

const GetUsersSchema = PagesSchema.extend({
  data: UserListSchema, 
});
export type TGetUsers = z.infer<typeof GetUsersSchema>;

export type TGetUserProps = '/users' | '/agents' | '/users-and-agents'
export function getUsers(url: TGetUserProps, page: number, limit: number): Promise<TGetUsers> {
  return axios.get(`${API_URL}${url}/?_page=${page}&_per_page=${limit}`)
    .then(res => res.data)
    .then(data => GetUsersSchema.parse(data));
}

export function deleteUser(id:string) {
  return axios.delete(`${API_URL}/users/${id}`)
}

type TEditUserParams = {
  id: string;
  name: string;
  email: string;
}
export function editUser({id, name, email}: TEditUserParams) {
  return axios
    .patch(`${API_URL}/users/${id}`, {
      name: name,
      email: email,
    })
    .then(data => UserListSchema.parse(data));
}

export type TBlockUserParams = {
  id: string;
  isBlocked: boolean;
}
export function blockUser({id, isBlocked}: TBlockUserParams) {
  return axios
    .patch(`${API_URL}/users/${id}`, {
      block: isBlocked,
    })
}

export function getUser(id: string): Promise<TUser> {
  return axios.get(`${API_URL}/users/${id}`).then(res => res.data).then(data => UserSchema.parse(data));
}