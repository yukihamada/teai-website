import { create } from 'zustand';
import { api } from '../api/endpoints';
import type { User } from '../api/endpoints';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.auth.login(email, password);
      localStorage.setItem('token', response.data.token);
      const userResponse = await api.auth.me();
      set({ user: userResponse.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.auth.me();
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch user',
        isLoading: false,
      });
    }
  },
}));