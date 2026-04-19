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

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '24px' }}>
      <TextField
        label="Access Token"
        placeholder="Введите ваш access token"
        value={inputValue}
        onChange={(value) => setInputValue(value || '')}
        status={error ? 'alert' : undefined}
        caption={error}
        style={{ flex: 1, maxWidth: '400px' }}
      />
      <Button label="Сохранить" onClick={handleSave} style={{ marginTop: '28px' }} />
    </div>
  );
};