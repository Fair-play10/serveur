const express = require('express');
const bodyParser = require('body-parser');
const reservationRoutes = require('./routes/reservationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const menuRoutes = require('./routes/menuRoutes');
const adminRoutes =require('./routes/adminRoutes')
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:8081', // Only allow requests from this domain
  methods: ['GET', 'POST'], // Allow only specific HTTP methods
};

app.use(cors(corsOptions));
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/admin',adminRoutes)

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
