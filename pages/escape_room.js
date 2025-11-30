import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

export default function EscapeRoom() {
  const studentNumber = "225";
  const studentName = "Vincent Ryan Wirnata";
  const [currentStage, setCurrentStage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [codeInput, setCodeInput] = useState('');
  const [message, setMessage] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      setMessage("⏰ Time's up! The room remains locked. You failed to escape!");
      saveAttempt(false, currentStage, timeLeft);
    }
  }, [timeLeft, isCompleted, currentStage]);

const stages = [
    {
      title: "🔒 Stage 1: Unlock the Door - Fix Code Formatting",
      description: "The door is locked behind poorly formatted code. Fix the formatting to proceed:",
      code: `function addNumbers(a,b){return a+b;}console.log(addNumbers(5,10));`,
      expected: `function addNumbers(a, b) {\n  return a + b;\n}\n\nconsole.log(addNumbers(5, 10));`,
      hint: "Add proper spacing after commas, indentation with 2 spaces, and line breaks",
      type: "format"
    },
     {
      title: "🔢 Stage 2: Calculate the Sum",
      description: "Calculate the sum of numbers from 1 to 100:",
      expected: `let sum = 0;\nfor (let i = 1; i <= 100; i++) {\n  sum += i;\n}\nsum`,
      hint: "Use a for loop from 1 to 100 and add each number to a sum variable",
      type: "generate"
    },
    {
  title: "💾 Stage 3: Create Greeting Function",
  description: "Write a function that returns a greeting message:",
  expected: `function greet(name) {\n  return "Hello, " + name + "!";\n}`,
  hint: "Create a function that takes a name parameter and returns a greeting string",
  type: "transform"
},
   {
  title: "🐛 Stage 4: Fix Number Check",
  description: "This code should check if a number is positive. Fix it:",
  code: `function isPositive(num) {\n  if (num = 0) {\n    return false;\n  }\n  return num > 0;\n}`,
  expected: `function isPositive(num) {\n  if (num === 0) {\n    return false;\n  }\n  return num > 0;\n}`,
  hint: "Check the comparison operator in the if statement",
  type: "format"
}
  ];

  const saveAttempt = async (completed, stagesCompleted, timeRemaining) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/escape-room/save-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: studentName,
          timeLeft: timeRemaining,
          completed,
          stagesCompleted,
          studentNumber
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Game progress saved to database!");
      } else {
        setMessage("❌ Failed to save progress to database");
      }
    } catch (error) {
      console.error('Failed to save attempt:', error);
      setMessage("❌ Network error - failed to save progress");
    } finally {
      setIsSaving(false);
    }
  };

  // NEW: Manual save button handler
  const handleManualSave = () => {
    saveAttempt(isCompleted, currentStage, timeLeft);
  };

  const checkSolution = () => {
    const currentStageData = stages[currentStage];
    setAttempts(prev => prev + 1);
    
    if (!codeInput.trim()) {
      setMessage("❌ Please write some code before submitting!");
      return;
    }

    // Normalize for comparison
    const normalizedInput = codeInput.trim().replace(/\s+/g, ' ');
    const normalizedExpected = currentStageData.expected?.trim().replace(/\s+/g, ' ') || '';
    
    if (normalizedInput === normalizedExpected) {
      if (currentStage === stages.length - 1) {
        setIsCompleted(true);
        setMessage("🎉 CONGRATULATIONS! You escaped the room! 🎉");
        saveAttempt(true, stages.length, timeLeft);
      } else {
        setCurrentStage(prev => prev + 1);
        setCodeInput('');
        setShowHint(false);
        setAttempts(0);
        setMessage(`✅ Correct! Door unlocked! Moving to Stage ${currentStage + 2}...`);
        // Auto-save on stage completion
        saveAttempt(false, currentStage + 1, timeLeft);
      }
    } else {
      setMessage("❌ Incorrect solution. The door remains locked. Try again!");
      setShowHint(attempts >= 2);
    }
  };

  const handleDebugClick = (line, char) => {
    const currentStageData = stages[currentStage];
    if (currentStageData.type === 'debug' && 
        line === currentStageData.bugPosition.line && 
        char === currentStageData.bugPosition.character) {
      setCurrentStage(prev => prev + 1);
      setCodeInput('');
      setMessage(`✅ Bug found! Security system disabled. Moving to next stage...`);
      // Auto-save on stage completion
      saveAttempt(false, currentStage + 1, timeLeft);
    } else {
      setMessage("❌ That's not the bug! Keep looking...");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetGame = () => {
    setCurrentStage(0);
    setTimeLeft(1800);
    setCodeInput('');
    setMessage('');
    setIsCompleted(false);
    setShowHint(false);
    setAttempts(0);
    // Save reset state
    saveAttempt(false, 0, 1800);
  };

  const currentStageData = stages[currentStage];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Header studentNumber={studentNumber} />
      
      <main style={{ 
        padding: '20px',
        minHeight: '80vh',
        background: 'url("background_escape.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: 10,
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🚪 ESCAPE ROOM CHALLENGE
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>
              Code your way out! Solve all {stages.length} challenges before time runs out.
            </p>
          </div>

          {/* Status Bar - UPDATED WITH SAVE BUTTON */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 25,
            background: 'rgba(255,255,255,0.1)',
            padding: '15px 20px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '1.2rem' }}>
              ⏰ <strong>Time:</strong> {formatTime(timeLeft)}
            </div>
            <div style={{ fontSize: '1.2rem' }}>
              🎯 <strong>Stage:</strong> {currentStage + 1}/{stages.length}
            </div>
            <div style={{ fontSize: '1.2rem' }}>
              🔄 <strong>Attempts:</strong> {attempts}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* NEW SAVE BUTTON */}
              <button 
                onClick={handleManualSave}
                disabled={isSaving}
                style={{
                  padding: '8px 16px',
                  background: isSaving ? '#666' : '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: 5,
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  opacity: isSaving ? 0.7 : 1
                }}
              >
                {isSaving ? '💾 Saving...' : '💾 Save Progress'}
              </button>
              
              <button 
                onClick={resetGame}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 5,
                  cursor: 'pointer'
                }}
              >
                🔄 Restart
              </button>
            </div>
          </div>

          {/* Game Content */}
          {isCompleted ? (
            <div style={{ 
              textAlign: 'center',
              background: 'rgba(46, 204, 113, 0.2)',
              padding: '50px 30px',
              borderRadius: 15,
              border: '2px solid #2ecc71'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎉</div>
              <h2 style={{ fontSize: '2rem', marginBottom: 15 }}>ESCAPE SUCCESSFUL!</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: 25 }}>
                You completed all challenges with {formatTime(timeLeft)} remaining!
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button 
                  onClick={handleManualSave}
                  disabled={isSaving}
                  style={{
                    padding: '12px 25px',
                    background: isSaving ? '#666' : '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: '1.1rem',
                    cursor: isSaving ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSaving ? '💾 Saving...' : '💾 Save Result'}
                </button>
                <button 
                  onClick={resetGame}
                  style={{
                    padding: '12px 30px',
                    background: '#2ecc71',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                  }}
                >
                  Play Again
                </button>
              </div>
            </div>
          ) : timeLeft === 0 ? (
            <div style={{ 
              textAlign: 'center',
              background: 'rgba(231, 76, 60, 0.2)',
              padding: '50px 30px',
              borderRadius: 15,
              border: '2px solid #e74c3c'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 20 }}>💀</div>
              <h2 style={{ fontSize: '2rem', marginBottom: 15 }}>TIME'S UP!</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: 25 }}>
                The room remains locked. Better luck next time!
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button 
                  onClick={handleManualSave}
                  disabled={isSaving}
                  style={{
                    padding: '12px 25px',
                    background: isSaving ? '#666' : '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: '1.1rem',
                    cursor: isSaving ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSaving ? '💾 Saving...' : '💾 Save Attempt'}
                </button>
                <button 
                  onClick={resetGame}
                  style={{
                    padding: '12px 30px',
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div style={{ 
              background: 'rgba(255,255,255,0.05)',
              padding: 30,
              borderRadius: 15,
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {/* Current Stage Header */}
              <div style={{ marginBottom: 25 }}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: 10,
                  color: '#feca57'
                }}>
                  {currentStageData.title}
                </h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.5 }}>
                  {currentStageData.description}
                </p>
              </div>

              {/* Code Display - Interactive for debug stage */}
              {currentStageData.code && (
                <div style={{ marginBottom: 25 }}>
                  <h3 style={{ marginBottom: 10, color: '#ff6b6b' }}>
                    {currentStageData.type === 'debug' ? '🔍 Find the Bug (Click on it):' : '🔍 Given Code:'}
                  </h3>
                  <pre style={{ 
                    background: '#1e1e1e', 
                    padding: 20, 
                    borderRadius: 8,
                    overflowX: 'auto',
                    fontSize: '14px',
                    border: '1px solid #333',
                    lineHeight: 1.4,
                    cursor: currentStageData.type === 'debug' ? 'pointer' : 'default'
                  }}>
                    {currentStageData.code.split('\n').map((line, lineIndex) => (
                      <div key={lineIndex} style={{ display: 'flex' }}>
                        <span style={{ color: '#6a9955', marginRight: 10 }}>{lineIndex + 1}</span>
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={charIndex}
                            onClick={() => currentStageData.type === 'debug' && handleDebugClick(lineIndex + 1, charIndex)}
                            style={{
                              cursor: currentStageData.type === 'debug' ? 'pointer' : 'default',
                              background: currentStageData.type === 'debug' && 
                                        lineIndex + 1 === currentStageData.bugPosition?.line && 
                                        charIndex === currentStageData.bugPosition?.character
                                ? 'rgba(255, 255, 0, 0.3)'
                                : 'transparent'
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    ))}
                  </pre>
                </div>
              )}

              {/* Code Input for non-debug stages */}
              {currentStageData.type !== 'debug' && (
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ marginBottom: 10, color: '#54a0ff' }}>💻 Your Solution:</h3>
                  <textarea
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    placeholder={`Write your ${currentStageData.code ? 'corrected' : 'solution'} code here...`}
                    rows={8}
                    style={{ 
                      width: '100%', 
                      padding: 15,
                      background: '#2d2d2d',
                      color: '#ffffff',
                      border: '2px solid #444',
                      borderRadius: 8,
                      fontFamily: '"Fira Code", monospace',
                      fontSize: '14px',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              {/* Buttons - UPDATED WITH SAVE BUTTON */}
              <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
                {currentStageData.type !== 'debug' && (
                  <button 
                    onClick={checkSolution}
                    style={{
                      padding: '12px 25px',
                      background: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    🚀 Submit Solution
                  </button>
                )}

                <button 
                  onClick={() => setShowHint(!showHint)}
                  style={{
                    padding: '12px 25px',
                    background: 'transparent',
                    color: '#feca57',
                    border: '2px solid #feca57',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  💡 {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>

                {/* NEW MANUAL SAVE BUTTON */}
                <button 
                  onClick={handleManualSave}
                  disabled={isSaving}
                  style={{
                    padding: '12px 25px',
                    background: isSaving ? '#666' : '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    cursor: isSaving ? 'not-allowed' : 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {isSaving ? '💾 Saving...' : '💾 Save Game'}
                </button>
              </div>

              {/* Hint */}
              {showHint && (
                <div style={{ 
                  marginTop: 20,
                  padding: 15,
                  background: 'rgba(254, 202, 87, 0.1)',
                  borderRadius: 8,
                  border: '1px solid #feca57'
                }}>
                  <strong>💡 Hint:</strong> {currentStageData.hint}
                </div>
              )}

              {/* Message */}
              {message && (
                <div style={{ 
                  marginTop: 20,
                  padding: 15,
                  background: message.includes('✅') || message.includes('🎉')
                    ? 'rgba(46, 204, 113, 0.2)' 
                    : 'rgba(231, 76, 60, 0.2)',
                  borderRadius: 8,
                  border: `1px solid ${message.includes('✅') || message.includes('🎉') ? '#2ecc71' : '#e74c3c'}`,
                  fontSize: '1.1rem'
                }}>
                  {message}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer name={studentName} studentNumber={studentNumber} />
    </div>
  );
}