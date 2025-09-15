// ======================================================
// MIDDLEWARE DE AUTENTICACION
// ======================================================

// importamos jsonwebtoken para verificar tokens JWT
const jwt = require("jsonwebtoken");

// importamos el modelo de tokens revocados (blacklist)
const RevokedToken = require("../models/RevokedToken");

// middleware para proteger rutas verificando el token en el header Authorization
const authMiddleware = async (req, res, next) => {
  try {
    // obtenemos el header Authorization
    const authHeader = req.headers["authorization"];

    // validamos que exista y que empiece con "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado: falta token" });
    }

    // extraemos el token del header (Bearer token)
    const token = authHeader.split(" ")[1];

    // verificamos el token usando la clave secreta del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ======================================================
    // NUEVO: validamos si el token ha sido revocado (logout)
    // ======================================================
    if (decoded.jti) {
      // buscamos el jti en la blacklist
      const revoked = await RevokedToken.findOne({ jti: decoded.jti }).lean();
      if (revoked) {
        return res.status(401).json({ message: "Token inválido (revocado)" });
      }
    }

    // agregamos la info decodificada al request
    req.user = decoded;        // objeto completo (id, email, jti, etc.)
    req.userId = decoded.id;   // acceso rápido al id del usuario

    // continuamos con la siguiente funcion de la ruta
    next();
  } catch (err) {
    // en caso de error (token invalido o expirado)
    console.error("Error en authMiddleware:", err.message);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

// exportamos el middleware para usarlo en rutas protegidas
module.exports = authMiddleware;
