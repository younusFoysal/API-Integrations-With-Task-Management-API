const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const dataRoutes = require('./src/routes/data');
const { connectDB } = require('./src/config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', dataRoutes);

// Database Connection
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});