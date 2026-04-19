import { useState } from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { useAppStore } from '../store/useAppStore';

export const TokenInput = () => {
  const { setToken } = useAppStore();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!inputValue.trim()) {
      setError('Токен не может быть пустым');
      return;
    }
    setError('');
    setToken(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      alignItems: 'flex-start', 
      padding: '16px 24px',
      background: '#f8f9fa',
      borderBottom: '1px solid #DFE3E8'
    }}>
      <div style={{ flex: 1, maxWidth: '500px' }}>
        <TextField
          label="Access Token"
          placeholder="Введите ваш access token от GoRest"
          value={inputValue}
          onChange={(value) => {
            setInputValue(value || '');
            setError('');
          }}
          onKeyDown={handleKeyDown}
          status={error ? 'alert' : undefined}
          caption={error || 'Токен можно получить на https://gorest.co.in'}
          style={{ width: '100%' }}
        />
      </div>
      <Button 
        label="Сохранить токен" 
        onClick={handleSave} 
        style={{ marginTop: '28px' }}
        size="m"
      />
    </div>
  );
};