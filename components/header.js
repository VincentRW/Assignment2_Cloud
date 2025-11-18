import ThemeToggle from './themeToggle'; // This assumes both are in same 'components' folder
import HamburgerMenu from './hamburgerMenu';
import Link from 'next/link';
import { useTabPersistence } from '../hooks/useTabPersistence';

export default function Header({ studentNumber }) {
  
  const [activeTab, setPersistentTab] = useTabPersistence('activeTab', 0);

  const linkStyle = (isActive) => ({
    margin: '0 10px',
    padding: '8px 16px',
    background: isActive ? '#0070f3' : 'transparent',
    color: isActive ? 'white' : 'inherit',
    border: '1px solid #333',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer'
  });

  const handleTabClick = (tabIndex) => {
    setPersistentTab(tabIndex);
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '2px solid #333',
      padding: '10px 20px',
      background: 'var(--header-bg)',
      color: 'var(--header-text)'
    }}>
      <div>
        <span style={{ fontWeight: 'bold' }}>{studentNumber}</span>
      </div>
      <nav aria-label="Main navigation" style={{ flex: 1, textAlign: 'center' }}>
        <Link 
          href="/"
          style={linkStyle(activeTab === 0)}
          onClick={() => handleTabClick(0)}
        >
          Tabs
        </Link>
        <Link 
          href="/escape_room"
          style={linkStyle(activeTab === 1)}
          onClick={() => handleTabClick(1)}
        >
          Escape Room
        </Link>
        <Link 
          href="/coding_races"
          style={linkStyle(activeTab === 2)}
          onClick={() => handleTabClick(2)}
        >
          Coding Races
        </Link>
        <Link 
          href="/court_room"
          style={linkStyle(activeTab === 3)}
          onClick={() => handleTabClick(3)}
        >
          Court Room
        </Link>
        <Link 
          href="/about"
          style={linkStyle(activeTab === 4)}
          onClick={() => handleTabClick(4)}
        >
          About
        </Link>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ThemeToggle />
        <HamburgerMenu />
      </div>
    </header>
  );
}