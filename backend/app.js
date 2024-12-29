const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv =  require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
dotenv.config();

connectDB();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173"], // Allowed origins
  credentials: true,                // Allow credentials
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;