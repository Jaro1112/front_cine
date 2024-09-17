import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ThemeToggle;
