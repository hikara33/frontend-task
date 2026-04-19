import { useState, useEffect, useCallback } from 'react';
import { Loader } from '@consta/uikit/Loader';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { getUsers } from '../api/gorest';
import { Pagination } from '../components/Pagination';
import type { User } from '../types';

export const UsersPage = () => {
  const { token } = useAppStore();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await getUsers(token, currentPage, perPage);
      setUsers(response.data);
      setTotalPages(response.meta.pagination.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, perPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRowClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  if (!token) {
    return <div style={{ padding: '24px' }}>Введите токен для загрузки данных</div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>Список пользователей</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #DFE3E8' }}>
                <th style={{ padding: '12px', textAlign: 'left', width: '80px' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Имя</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleRowClick(user.id)}
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #DFE3E8',
                  }}
                >
                  <td style={{ padding: '12px' }}>{user.id}</td>
                  <td style={{ padding: '12px' }}>{user.name}</td>
                  <td style={{ padding: '12px' }}>{user.email}</td>
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