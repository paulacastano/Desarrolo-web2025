const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

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

const checkRole = (roles) => (req, res, next) => {
  const { rol_id } = req.user;
  if (!roles.includes(rol_id)) {
    return res.sendStatus(403).json({ message: "No tienes permisos" });
  }
  next();
};

module.exports = { authenticateToken, checkRole };
