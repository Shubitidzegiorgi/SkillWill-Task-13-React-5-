import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useWindowResize from './hooks/useWindowResize';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [isDesktop, setIsDesktop] = useState(false); // State to determine desktop/mobile
  const { width } = useWindowResize();

  // Check if width is greater than 768px (desktop width)
  useEffect(() => {
    setIsDesktop(width > 768);
  }, [width]);

  useEffect(() => {
    // If dark mode is active and the window width is less than or equal to 768px (mobile), force light mode
    if (isDarkMode && !isDesktop) {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    } else {
      document.body.style.backgroundColor = isDarkMode ? '#1f1f1f' : '#ffffff';
      document.body.style.color = isDarkMode ? '#ffffff' : '#000000';
    }
  }, [isDarkMode, isDesktop]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={isDesktop && isDarkMode ? 'dark' : 'light'}>
      {isDesktop && (
        <button onClick={toggleTheme}>Toggle Theme</button>
      )}
      <h1 style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </h1>
      {!isDesktop && (
        <h1 style={{ color: '#000000' }}>Light Mode</h1>
      )}
    </div>
  );
};

export default App;