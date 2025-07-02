// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const connectDB = require('./config/db');
// require('dotenv').config();

// // Initialize Express app
// const app = express();

// // Connect to MongoDB using the config file
// connectDB();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));


// // Import routes
// const indexRoutes = require('./routes/index');

// // Use routes
// app.use('/', indexRoutes);

// // Error handler middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = app;


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // ✅ Import cors
const connectDB = require('./config/db');
require('dotenv').config();
const newsRoutes = require('./routes/news.route');

// Initialize Express app
const app = express();
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});


// ✅ Enable CORS for requests from React frontend (Vite runs on 5173)
app.use(cors({
  origin: ['http://localhost:5173', 'https://smartsustainableservices.ae'],
  credentials: true
}));

// Connect to MongoDB using the config file
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRoutes = require('./routes/index');

// Use routes
app.use('/', indexRoutes);
app.use('/api/news', newsRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
//const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 3000;
console.log("🚀 Server will listen on:", PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
