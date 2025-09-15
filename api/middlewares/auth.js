// ======================================================
// MIDDLEWARE DE AUTENTICACION
// ======================================================

// importamos jsonwebtoken para verificar tokens JWT
const jwt = require("jsonwebtoken");

// middleware para proteger rutas, verificando token
const authMiddleware = (req, res, next) => {
  // obtenemos el token desde cookies o desde el header Authorization (Bearer token)
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  // si no hay token, devolvemos error 401 (no autorizado)
  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    // verificamos el token usando la clave secreta del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // agregamos la info del usuario decodificada al request
    // req.user tendra { id, email } u otros datos que hayas puesto en el payload
    req.user = decoded;

    // llamamos a next() para continuar con la siguiente función de la ruta
    next();
  } catch (err) {
    // si el token es inválido o expiró, devolvemos 401
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// exportamos el middleware para usarlo en rutas protegidas
module.exports = authMiddleware;
