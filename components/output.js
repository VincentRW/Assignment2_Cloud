export default function OutputBox({ tabs, isVisible, selectedTab }) {
  const generateCompleteHTML = () => {
    const currentTab = tabs[selectedTab];
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentTab.heading}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
        }
        .tab-content {
            border: 1px solid #333;
            padding: 20px;
            margin: 10px 0;
            border-radius: 4px;
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #0070f3;
            padding-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="tab-content">
        <h1>${currentTab.heading}</h1>
        <div>${currentTab.content}</div>
    </div>
    
    <script>
        // JavaScript for this tab
        document.addEventListener('DOMContentLoaded', function() {
            console.log('${currentTab.heading} loaded successfully');
            
            // You can add more interactive functionality here
            const tabElement = document.querySelector('.tab-content');
            if (tabElement) {
                tabElement.addEventListener('click', function() {
                    this.style.backgroundColor = this.style.backgroundColor === 'lightyellow' ? 'white' : 'lightyellow';
                });
            }
        });
    </script>
</body>
</html>`;
  };

  if (!isVisible) {
    return (
      <div style={{ 
        border: '1px dashed #ccc', 
        padding: '20px', 
        textAlign: 'center',
        color: '#666'
      }}>
        <p>Click &quot;Output&quot; button to generate complete HTML file</p>
      </div>
    );
  }

  if (!tabs[selectedTab]) {
    return (
      <div style={{ 
        border: '1px dashed #ccc', 
        padding: '20px', 
        textAlign: 'center',
        color: '#666'
      }}>
        <p>No tab selected</p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCompleteHTML());
    alert('Complete HTML file copied to clipboard! Save it as .html and open in browser.');
  };

  return (
    <div>
      <button onClick={handleCopy}>
        Copy Complete HTML File
      </button>
      <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
        Generating complete HTML file for: <strong>{tabs[selectedTab].heading}</strong>
      </p>
      <pre style={{
        border: '1px solid #333',
        padding: '10px',
        marginTop: '8px',
        background: '#f4f4f4',
        maxWidth: '500px',
        maxHeight: '400px',
        overflow: 'auto',
        fontSize: '11px'
      }}>
        {generateCompleteHTML()}
      </pre>
      
      <div style={{ 
        marginTop: '10px', 
        padding: '10px', 
        background: '#e8f4fd', 
        border: '1px solid #0070f3',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <strong>How to use:</strong>
        <ol style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>Click &quot;Copy Complete HTML File&quot;</li>
          <li>Create a new file called <strong>hello.html</strong></li>
          <li>Paste the copied code</li>
          <li>Save the file and open it in any web browser</li>
        </ol>
      </div>
    </div>
  );
}