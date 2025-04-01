import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean | null;  // null means system preference
  setDarkMode: (isDark: boolean | null) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: null,
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'theme-storage',
    }
  )
);