require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

const migrateCollections = async () => {
  await connectDB();

  try {
    // Leer el archivo db.json
    const data = JSON.parse(fs.readFileSync('src/data.json', 'utf-8'));

    // Iterar sobre cada clave (que representa una colección)
    for (const [collectionName, documents] of Object.entries(data)) {
      // Crear un esquema genérico (flexible)
      const schema = new mongoose.Schema({}, { strict: false });
      // El tercer parámetro asegura que la colección se llame igual que la clave en el JSON
      const Model = mongoose.model(collectionName, schema, collectionName);

      if (Array.isArray(documents) && documents.length > 0) {
        await Model.insertMany(documents);
        console.log(
          `✅ Migrados ${documents.length} documentos a la colección: ${collectionName}`,
        );
      } else {
        console.log(
          `ℹ️ No hay documentos para migrar en la colección: ${collectionName}`,
        );
      }
    }

    console.log('✅ Migración completada.');
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

migrateCollections();
