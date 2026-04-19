import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const { token, viewMode, setViewMode } = useAppStore();
  const currentTab = items.find((item) => item.id === viewMode);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1 style={{ margin: 0 }}>GoRest тестовое задание</h1>
        </header>
        <TokenInput />
        {token && (
          <Tabs
            value={currentTab}
            onChange={(item) => setViewMode(item.id)}
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
                  viewMode === 'users' ? (
                    <Navigate to="/users" replace />
                  ) : (
                    <Navigate to="/posts" replace />
                  )
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
    </BrowserRouter>
  );
}

export default App;