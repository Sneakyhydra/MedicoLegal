// Imports
const express = require('express'); // Create server
const cors = require('cors'); // Cors middleware
const path = require('path');
const cookieParser = require('cookie-parser'); // Parse cookies

// Init app
const app = express();

// Store port number in a variable
const port = process.env.PORT || 5000;

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/forms', require('./routes/forms'));
app.use('/api/reports', require('./routes/reports'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));
