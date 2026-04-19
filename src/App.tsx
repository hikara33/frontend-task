import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from '@consta/uikit/Tabs';
import { useAppStore } from './store/useAppStore';
import { TokenInput } from './components/TokenInput';
import { UsersPage } from './pages/UsersPage';
import { PostsPage } from './pages/PostsPage';
import { UserCard } from './pages/UserCard';
import { PostCard } from './pages/PostCard';
import type { ViewMode } from './types';
import './style.css';

const items: { label: string; id: ViewMode }[] = [
  { label: 'Пользователи', id: 'users' },
  { label: 'Посты', id: 'posts' },
];

function AppContent() {
  const { token, viewMode, setViewMode } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) return;
    const currentPath = location.pathname;
    if (currentPath === '/users' && viewMode !== 'users') {
      setViewMode('users');
    } else if (currentPath === '/posts' && viewMode !== 'posts') {
      setViewMode('posts');
    }
  }, [token, viewMode, setViewMode, location.pathname]);

  const handleTabChange = (item: { id: ViewMode }) => {
    setViewMode(item.id);
    navigate(item.id === 'users' ? '/users' : '/posts');
  };

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.startsWith('/posts')) return items.find(i => i.id === 'posts');
    return items.find(i => i.id === 'users');
  };

  return (
    <div className="app">
      <header className="header">
        <h1 style={{ margin: 0 }}>GoRest тестовое задание</h1>
      </header>
      <TokenInput />
      {token && (
        <Tabs
          value={getCurrentTab()}
          onChange={handleTabChange}
          items={items}
          style={{ padding: '0 24px' }}
        />
      )}
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/users" replace />
              ) : (
                <div style={{ padding: '24px' }}>
                  Введите access token для начала работы
                </div>
              )
            }
          />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserCard />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostCard />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;