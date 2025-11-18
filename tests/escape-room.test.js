// Test 1: Escape room logic
test('escape room stage progression', () => {
  const stages = ['formatting', 'generation', 'transformation', 'debugging'];
  let currentStage = 0;
  
  // Simulate completing a stage
  currentStage += 1;
  expect(currentStage).toBe(1);
  expect(stages[currentStage]).toBe('generation');
});

// Test 2: Number sequence generation
test('number sequence generation from 0 to 10', () => {
  const generateSequence = (start, end) => {
    let result = '';
    for (let i = start; i <= end; i++) {
      result += i;
    }
    return result;
  };
  
  const sequence = generateSequence(0, 10);
  expect(sequence).toBe('012345678910');
  expect(sequence).toContain('10');
  expect(sequence.length).toBe(12); // 0-9 (10 chars) + 10 (2 chars)
});

// Test 3: Data transformation
test('CSV to JSON transformation', () => {
  const csvToJson = (csv) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      result.push(obj);
    }
    
    return JSON.stringify(result);
  };
  
  const csv = 'name,age,city\nJohn,25,New York\nJane,30,London';
  const json = csvToJson(csv);
  
  expect(json).toContain('John');
  expect(json).toContain('25');
  expect(json).toContain('New York');
});

// Test 4: Basic functionality
test('basic math operations', () => {
  expect(1 + 1).toBe(2);
  expect(10 * 5).toBe(50);
  expect(100 / 10).toBe(10);
});
