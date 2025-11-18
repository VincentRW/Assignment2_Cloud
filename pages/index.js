import Header from '../components/header';
import Footer from '../components/footer';
import TabsGenerator from '../components/tabs';
import OutputBox from '../components/output';
import { useState } from 'react';

export default function Home() {
  const studentNumber = "22586687";
  const studentName = "Vincent Ryan Wirnata";
  const [tabs, setTabs] = useState([
    { heading: "Step 1", content: "First step" },
    { heading: "Step 2", content: "Second step" }
  ]);
  const [showOutput, setShowOutput] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); 

  const handleShowOutput = () => {
    setShowOutput(true);
  };

  return (
    <div>
      <Header studentNumber={studentNumber} />
      <main style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 32 }}>
          <TabsGenerator 
            tabs={tabs} 
            setTabs={setTabs} 
            onShowOutput={handleShowOutput}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div>
            <h3>Output</h3>
            <OutputBox 
              tabs={tabs} 
              isVisible={showOutput}
              selectedTab={selectedTab}
            />
          </div>
        </div>
      </main>
      <Footer name={studentName} studentNumber={studentNumber} />
    </div>
  );
}