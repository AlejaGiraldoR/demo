// ======================================================
// MODELO DE TOKENS REVOCADOS (BLACKLIST)
// ======================================================

// importamos mongoose para definir el esquema y modelo
const mongoose = require("mongoose");

// definimos el esquema de un token revocado
const revokedTokenSchema = new mongoose.Schema(
  {
    // jti = identificador único del token JWT (se genera en el login)
    jti: {
      type: String,
      required: true,
      unique: true, // cada jti solo debe aparecer una vez en la blacklist
    },

    // fecha de expiración del token original
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    // creamos automáticamente las fechas createdAt y updatedAt
    timestamps: true,
  }
);

// ======================================================
// ÍNDICE TTL (Time To Live)
// ======================================================
// este índice hace que el documento se elimine automáticamente
// cuando se alcance la fecha de "expiresAt"
// así mantenemos limpia la colección de tokens revocados
revokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// creamos el modelo RevokedToken basado en el esquema
const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);

// exportamos el modelo para usarlo en los controladores y middleware
module.exports = RevokedToken;
 
