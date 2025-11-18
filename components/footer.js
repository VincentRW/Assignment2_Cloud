import { useEffect, useState } from 'react';

export default function Footer({ name, studentNumber }) {
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <footer style={{
      borderTop: '2px solid #333',
      textAlign: 'center',
      padding: '10px',
      marginTop: '20px'
    }}>
      <p>Copyright - Created by {name} - {studentNumber}</p>
      <p>Date: {currentDate || 'Loading...'}</p>
    </footer>
  );
}