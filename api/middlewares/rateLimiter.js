// ======================================================
// MIDDLEWARE PARA LIMITAR INTENTOS DE LOGIN
// ======================================================

// importamos express-rate-limit para limitar solicitudes
const rateLimit = require("express-rate-limit");

// configuramos un limitador para login
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // ventana de tiempo: 10 minutos
  max: 5,                    // máximo 5 intentos por IP en la ventana
  message: {
    message: "Demasiados intentos fallidos. Intenta de nuevo en 10 minutos.",
  },
  standardHeaders: true,      // devuelve info de límite en headers estándar
  legacyHeaders: false,       // deshabilita headers legacy (X-RateLimit-*)
});

// exportamos el limitador para usarlo en la ruta de login
module.exports = { loginLimiter };
