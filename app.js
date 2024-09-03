const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const discountRoutes = require('./routes/discount');
const swaggerSetup = require('./config/swagger');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());

// View Engine
app.set('view engine', 'ejs');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/discounts', discountRoutes);

// Swagger setup
swaggerSetup(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
