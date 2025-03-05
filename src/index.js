require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas (reemplaza <password> con tu contraseña)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB!'))
  .catch((err) => console.error('Error de conexión:', err));

// Rutas
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const teamRoutes = require('./routes/team');
const favoritesRoutes = require('./routes/favorites');
// const authRoutes = require('./routes/auth');
// const loginRoutes = require('./routes/login');
const stockRoutes = require('./routes/stock');
const productRoutes = require('./routes/products');

// Asigna las rutas a sus endpoints
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/favorites', favoritesRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/login', loginRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
