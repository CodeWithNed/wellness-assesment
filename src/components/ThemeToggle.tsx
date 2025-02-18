import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 dark:text-green-400 text-purple-600" />
      ) : (
        <Moon className="w-6 h-6 dark:text-green-400 text-purple-600" />
      )}
    </button>
  );
};