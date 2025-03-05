const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('❌ MONGO_URI no está definido en .env');

    await mongoose.connect(uri); // Eliminamos opciones obsoletas

    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
