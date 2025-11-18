import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDark(true);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={dark}
        onChange={() => setDark(prev => !prev)}
        aria-label="Toggle Dark Mode"
        style={{ marginRight: 8 }}
      />
      {dark ? '🌙 Dark' : '☀️ Light'}
    </label>
  );
}