import axios from 'axios';
import type { User, Post, Comment } from '../types';

const BASE_URL = 'https://gorest.co.in/public/v2';

interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

const createApiClient = (token: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const calcTotalPages = (total: number, perPage: number): number => {
  if (total === 0) return 0;
  return Math.ceil(total / perPage);
};

export const getUsers = async (
  token: string,
  page: number = 1,
  perPage: number = 10
) => {
  const client = createApiClient(token);
  const response = await client.get<User[]>('/users', {
    params: { page, per_page: perPage },
  });
  const data = response.data;
  const total = data.length;
  const pagination: PaginationMeta = {
    page,
    per_page: perPage,
    total: total + (page - 1) * perPage,
    total_pages: calcTotalPages(total + (page - 1) * perPage, perPage),
  };
  return {
    data,
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
  const data = response.data;
  const total = data.length;
  const pagination: PaginationMeta = {
    page,
    per_page: perPage,
    total: total + (page - 1) * perPage,
    total_pages: calcTotalPages(total + (page - 1) * perPage, perPage),
  };
  return {
    data,
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
  const data = response.data;
  const total = data.length;
  const pagination: PaginationMeta = {
    page,
    per_page: perPage,
    total: total + (page - 1) * perPage,
    total_pages: calcTotalPages(total + (page - 1) * perPage, perPage),
  };
  return {
    data,
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
  const data = response.data;
  const total = data.length;
  const pagination: PaginationMeta = {
    page,
    per_page: perPage,
    total: total + (page - 1) * perPage,
    total_pages: calcTotalPages(total + (page - 1) * perPage, perPage),
  };
  return {
    data,
    meta: { pagination },
  };
};