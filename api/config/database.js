const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI no está definido en las variables de entorno");
    }

    await mongoose.connect(process.env.MONGO_URI); // ya no necesitamos useNewUrlParser ni useUnifiedTopology
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error.message);
    process.exit(1); // detiene la app si no se conecta
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("✅ Desconectado de MongoDB");
  } catch (error) {
    console.error("❌ Error al desconectar de MongoDB:", error.message);
  }
};

module.exports = { connectDB, disconnectDB };
