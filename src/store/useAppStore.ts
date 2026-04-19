import { create } from 'zustand';
import type { ViewMode } from '../types';

interface AppState {
  token: string;
  viewMode: ViewMode;
  setToken: (token: string) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useAppStore = create<AppState>((set) => ({
  token: '',
  viewMode: 'users',
  setToken: (token: string) => set({ token }),
  setViewMode: (viewMode: ViewMode) => set({ viewMode }),
}));