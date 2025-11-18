import { useEffect } from 'react';

export default function TabsGenerator({ tabs, setTabs, onShowOutput, selectedTab, setSelectedTab }) {
  useEffect(() => {
    const stored = localStorage.getItem('tabs');
    if (stored) setTabs(JSON.parse(stored));
  }, [setTabs]);

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  const addTab = () => {
    if (tabs.length < 15)
      setTabs([...tabs, { heading: `Step ${tabs.length + 1}`, content: '' }]);
  };
  
  const removeTab = (i) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((_, idx) => idx !== i);
      setTabs(newTabs);
      setSelectedTab(Math.max(0, selectedTab - 1));
    }
  };
  
  const updateTab = (i, heading, content) => {
    const newTabs = [...tabs];
    newTabs[i] = { heading, content };
    setTabs(newTabs);
  };

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <div>
        <h3>Tabs Headers: <button onClick={addTab}>[+]</button></h3>
        <ul>
          {tabs.map((tab, i) => (
            <li key={i}>
              <button
                style={{
                  fontWeight: selectedTab === i ? 'bold' : 'normal',
                  background: selectedTab === i ? '#eee' : 'transparent',
                  border: '1px solid #333',
                  padding: '4px 10px',
                  marginBottom: '2px'
                }}
                onClick={() => setSelectedTab(i)}
                aria-current={selectedTab === i}
              >
                {tab.heading}
              </button>
              <button onClick={() => removeTab(i)} aria-label="Remove Tab" style={{ marginLeft: 5 }}>[-]</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Tabs Content</h3>
        <input
          type="text"
          value={tabs[selectedTab]?.heading || ''}
          onChange={e => updateTab(selectedTab, e.target.value, tabs[selectedTab]?.content || '')}
          aria-label="Tab Heading"
          style={{ marginBottom: 8, display: 'block', width: '200px' }}
        />
        <textarea
          value={tabs[selectedTab]?.content || ''}
          onChange={e => updateTab(selectedTab, tabs[selectedTab]?.heading || '', e.target.value)}
          aria-label="Tab Content"
          rows={5}
          style={{ width: '300px' }}
        />
        
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={onShowOutput}
            style={{
              border: '1px solid #333',
              padding: '4px 10px',
              background: 'transparent',
              marginBottom: '10px'
            }}
          >
            Output Current Tab
          </button>
        </div>
      </div>
    </div>
  );
}