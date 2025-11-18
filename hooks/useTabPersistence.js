import { useState, useEffect } from 'react';

export function useTabPersistence(cookieName = 'activeTab', defaultTab = 0) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem(cookieName);
      if (savedTab !== null) {
        setActiveTab(parseInt(savedTab, 10));
      }
    }
  }, [cookieName]);

  const setPersistentTab = (tabIndex) => {
    setActiveTab(tabIndex);
    if (typeof window !== 'undefined') {
      localStorage.setItem(cookieName, tabIndex.toString());
    }
  };

  return [activeTab, setPersistentTab];
}
