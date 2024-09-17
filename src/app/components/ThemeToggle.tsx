import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
      style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}
    >
      {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
}
