import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import { useAppStore } from '../store/useAppStore';
import { getPost, getPostComments } from '../api/gorest';
import type { Post, Comment } from '../types';

export const PostCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAppStore();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !id) return;
    setLoading(true);
    const postId = parseInt(id, 10);

    Promise.all([
      getPost(token, postId),
      getPostComments(token, postId),
    ])
      .then(([postData, commentsResponse]) => {
        setPost(postData);
        setComments(commentsResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
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

  if (!post) {
    return <div style={{ padding: '24px' }}>Пост не найден</div>;
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
        <h2 style={{ marginBottom: '24px' }}>Пост</h2>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#495057', marginBottom: '4px' }}>ID</div>
          <div>{post.id}</div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#495057', marginBottom: '4px' }}>Заголовок</div>
          <div>{post.title}</div>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: '#495057', marginBottom: '4px' }}>Содержание</div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{post.body}</div>
        </div>
        <h3 style={{ marginBottom: '16px' }}>Комментарии ({comments.length})</h3>
        {comments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: '16px',
                  border: '1px solid #DFE3E8',
                  borderRadius: '8px',
                }}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{comment.name}</p>
                <p style={{ fontSize: '12px', color: '#495057', marginBottom: '8px' }}>
                  {comment.email}
                </p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Нет комментариев</p>
        )}
      </div>
    </div>
  );
};