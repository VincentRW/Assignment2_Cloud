export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, content, style = 'default' } = req.body;
      
      let html = '';
      
      switch (style) {
        case 'modern':
          html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 800px;
            width: 100%;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .content {
            line-height: 1.8;
            color: #555;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${title}</h1>
        <div class="content">${content}</div>
    </div>
    <script>
        console.log('Dynamic modern page loaded: ${title}');
        // Add interactive features
        document.addEventListener('click', function() {
            document.body.style.background = document.body.style.background === 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        });
    </script>
</body>
</html>`;
          break;
          
        case 'professional':
          html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            margin: 0;
            padding: 40px;
            background: #f8f9fa;
            color: #333;
            line-height: 1.6;
        }
        .document {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 60px;
            box-shadow: 0 0 30px rgba(0,0,0,0.1);
            border: 1px solid #e0e0e0;
        }
        h1 {
            border-bottom: 3px solid #2c3e50;
            padding-bottom: 10px;
            margin-bottom: 30px;
            color: #2c3e50;
            font-size: 2.2rem;
        }
        .content {
            font-size: 1.1rem;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="document">
        <h1>${title}</h1>
        <div class="content">${content}</div>
        <div class="footer">
            Generated dynamically by Escape Room App
        </div>
    </div>
</body>
</html>`;
          break;
          
        default:
          html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
            background: #f5f5f5;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #0070f3;
            padding-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="content">
        <h1>${title}</h1>
        <div>${content}</div>
    </div>
    <script>
        console.log('Dynamic page loaded: ${title}');
    </script>
</body>
</html>`;
      }
      
      res.status(200).json({ 
        success: true, 
        html: html,
        style: style,
        generatedAt: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Lambda error:', error);
      res.status(500).json({ error: 'Failed to generate dynamic page' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}