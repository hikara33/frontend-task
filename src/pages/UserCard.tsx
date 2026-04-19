import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import { TextField } from '@consta/uikit/TextField';
import { useAppStore } from '../store/useAppStore';
import { getUser, getUserPosts } from '../api/gorest';
import type { User, Post } from '../types';

export const UserCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAppStore();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !id) return;
    setLoading(true);
    const userId = parseInt(id, 10);

    Promise.all([
      getUser(token, userId),
      getUserPosts(token, userId),
    ])
      .then(([userData, postsResponse]) => {
        setUser(userData);
        setPosts(postsResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, id]);

  if (!token) {
    return <div style={{ padding: '24px' }}>Введите токен для загрузки данных</div>;
  }

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <div style={{ padding: '24px' }}>Пользователь не найден</div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Button
        label="Назад к списку"
        onClick={() => navigate(-1)}
        view="ghost"
        style={{ marginBottom: '24px' }}
      />
      <div style={{ padding: '24px', border: '1px solid #DFE3E8', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '24px' }}>Информация о пользователе</h2>
        <TextField
          label="ID"
          value={String(user.id)}
          readOnly
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Имя"
          value={user.name}
          readOnly
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Email"
          value={user.email}
          readOnly
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Пол"
          value={user.gender}
          readOnly
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Статус"
          value={user.status}
          readOnly
          style={{ marginBottom: '24px' }}
        />
        <h3 style={{ marginBottom: '16px' }}>Посты пользователя ({posts.length})</h3>
        {posts.length > 0 ? (
          <ul style={{ paddingLeft: '20px' }}>
            {posts.map((post) => (
              <li
                key={post.id}
                onClick={() => navigate(`/posts/${post.id}`)}
                style={{ cursor: 'pointer', color: '#0055FF', marginBottom: '8px' }}
              >
                {post.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет постов</p>
        )}
      </div>
    </div>
  );
};