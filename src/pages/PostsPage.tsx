import { useState, useEffect, useCallback } from 'react';
import { Loader } from '@consta/uikit/Loader';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { getPosts } from '../api/gorest';
import { Pagination } from '../components/Pagination';
import type { Post } from '../types';

export const PostsPage = () => {
  const { token } = useAppStore();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await getPosts(token, currentPage, perPage);
      setPosts(response.data);
      setTotalPages(response.meta.pagination.total_pages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, perPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRowClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  if (!token) {
    return <div style={{ padding: '24px' }}>Введите токен для загрузки данных</div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>Список постов</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #DFE3E8' }}>
                <th style={{ padding: '12px', textAlign: 'left', width: '80px' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Заголовок</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => handleRowClick(post.id)}
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #DFE3E8',
                  }}
                >
                  <td style={{ padding: '12px' }}>{post.id}</td>
                  <td style={{ padding: '12px' }}>{post.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            onPageChange={setCurrentPage}
            onPerPageChange={(newPerPage) => {
              setPerPage(newPerPage);
              setCurrentPage(1);
            }}
          />
        </>
      )}
    </div>
  );
};