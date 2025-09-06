const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cardRoutes = require('./routes/cardRoute');
const connectToDB = require('./config/database');
const userRoute = require('./routes/userRoute');
const deckRoute = require('./routes/deckRoute');
const aiRoute = require('./routes/aiRoute');
require('dotenv').config();
const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/ai', aiRoute)
app.use('/api/users', userRoute);
app.use('/api', cardRoutes)
app.use('/api', deckRoute)

const startServer = async () => {
  try {
    
    //start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });

    await connectToDB();

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Routes

// Health check route
app.get('/api/health', async (req, res) => {
  res.status(200).json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString() 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;