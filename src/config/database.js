const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Imprimimos las variables de entorno en la consola (Útil para depuración, pero no recomendable en producción)
console.log("DB_NAME: ", process.env.DB_NAME);
console.log("DB_USER: ", process.env.DB_USER);
console.log("DB_PASSWORD: ", process.env.DB_PASSWORD);
// Creamos una instancia de Sequelize para conectarnos a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
    timezone: "-05:00",
  }
);
// Exportamos la instancia de Sequelize para usarla en otros archivos del proyecto
module.exports = sequelize;
