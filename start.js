const express = require('express');
const path = require('path');

// Create a simple static file server for the frontend
const app = express();
const PORT = 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main HTML file for all routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌐 Frontend server running on http://localhost:${PORT}`);
  console.log(`📊 Make sure your backend server is running on http://localhost:5000`);
  console.log(`💡 Open http://localhost:${PORT} in your browser to access the application`);
});
