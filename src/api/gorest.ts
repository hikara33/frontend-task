import axios from 'axios';
import type { User, Post, Comment, PaginatedResponse } from '../types';

const BASE_URL = 'https://gorest.co.in/public/v2';

const createApiClient = (token: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUsers = async (
  token: string,
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<User>> => {
  const client = createApiClient(token);
  const response = await client.get<PaginatedResponse<User>>('/users', {
    params: { page, per_page: perPage },
  });
  return response.data;
};

export const getUser = async (token: string, userId: number): Promise<User> => {
  const client = createApiClient(token);
  const response = await client.get<User>(`/users/${userId}`);
  return response.data;
};

export const getPosts = async (
  token: string,
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<Post>> => {
  const client = createApiClient(token);
  const response = await client.get<PaginatedResponse<Post>>('/posts', {
    params: { page, per_page: perPage },
  });
  return response.data;
};

export const getPost = async (token: string, postId: number): Promise<Post> => {
  const client = createApiClient(token);
  const response = await client.get<Post>(`/posts/${postId}`);
  return response.data;
};

export const getUserPosts = async (
  token: string,
  userId: number,
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<Post>> => {
  const client = createApiClient(token);
  const response = await client.get<PaginatedResponse<Post>>('/posts', {
    params: { user_id: userId, page, per_page: perPage },
  });
  return response.data;
};

export const getPostComments = async (
  token: string,
  postId: number,
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<Comment>> => {
  const client = createApiClient(token);
  const response = await client.get<PaginatedResponse<Comment>>(`/posts/${postId}/comments`, {
    params: { page, per_page: perPage },
  });
  return response.data;
};