import axios from 'axios';
import type { User, Post, Comment } from '../types';

const BASE_URL = 'https://gorest.co.in/public/v2';

interface PaginationHeaders {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

const getPaginationHeaders = (headers: Record<string, string>): PaginationHeaders => ({
  page: parseInt(headers['x-pagination-page'] || '1', 10),
  per_page: parseInt(headers['x-pagination-limit'] || '10', 10),
  total: parseInt(headers['x-pagination-total'] || '0', 10),
  total_pages: parseInt(headers['x-pagination-total-pages'] || '0', 10),
});

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
) => {
  const client = createApiClient(token);
  const response = await client.get<User[]>('/users', {
    params: { page, per_page: perPage },
  });
  const pagination = getPaginationHeaders(response.headers as Record<string, string>);
  return {
    data: response.data,
    meta: { pagination },
  };
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
) => {
  const client = createApiClient(token);
  const response = await client.get<Post[]>('/posts', {
    params: { page, per_page: perPage },
  });
  const pagination = getPaginationHeaders(response.headers as Record<string, string>);
  return {
    data: response.data,
    meta: { pagination },
  };
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
) => {
  const client = createApiClient(token);
  const response = await client.get<Post[]>('/posts', {
    params: { user_id: userId, page, per_page: perPage },
  });
  const pagination = getPaginationHeaders(response.headers as Record<string, string>);
  return {
    data: response.data,
    meta: { pagination },
  };
};

export const getPostComments = async (
  token: string,
  postId: number,
  page: number = 1,
  perPage: number = 10
) => {
  const client = createApiClient(token);
  const response = await client.get<Comment[]>(`/posts/${postId}/comments`, {
    params: { page, per_page: perPage },
  });
  const pagination = getPaginationHeaders(response.headers as Record<string, string>);
  return {
    data: response.data,
    meta: { pagination },
  };
};