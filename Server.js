const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./Routers/auth');
const keys = require('./config/keys');

const app = express();
const port = process.env.PORT || 3000;

// Bodyparser middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/E-Compress', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Use Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
