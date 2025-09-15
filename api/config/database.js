// ======================================================
// CONFIGURACION DE CONEXION A MONGODB
// ======================================================

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // conectamos usando la URI de .env
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI no está definido en .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("🛑 Desconectado de MongoDB");
  } catch (error) {
    console.error("❌ Error al desconectar MongoDB:", error.message);
  }
};

module.exports = { connectDB, disconnectDB };
