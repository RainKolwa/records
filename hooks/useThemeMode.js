import { useState, useEffect } from 'react';

export default function useThemeMode() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    function checkConfig() {
      console.log('color changes');
      const flag =
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDark(flag);
    }
    window.addEventListener('storage', checkConfig);
    return () => {
      window.removeEventListener('storage', checkConfig);
    };
  }, []);

  return isDark;
}
