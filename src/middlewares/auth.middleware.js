const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//// Obtiene la clave secreta para firmar/verificar tokens
const SECRET_KEY = process.env.JWT_SECRET;

/**
 * Middleware que verifica si el token JWT es válido.
 * Si es válido, agrega la información del usuario al objeto 'req'.
 * Si no, responde con error 401 o 403 según corresponda.
 */
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401).json({ message: "Acceso denegado" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ message: "Token invalido" });
    }
    req.user = user;
    next();
  });
};

/**
 * Middleware que verifica si el usuario tiene uno de los roles permitidos.
 * Si no tiene permiso, responde con error 403.
 */
const checkRole = (roles) => (req, res, next) => {
  const { rol_id } = req.user;
  if (!roles.includes(rol_id)) {
    return res.sendStatus(403).json({ message: "No tienes permisos" });
  }
  next();
};

/// Exporta los middlewares para usarlos en las rutas
module.exports = { authenticateToken, checkRole };
