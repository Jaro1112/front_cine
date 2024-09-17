import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    </button>
  );
};

export default ThemeToggle;
