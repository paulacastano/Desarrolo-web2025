const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definición del modelo "Role" que representa la tabla "roles"
const Role = sequelize.define(
  "roles",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    timestamps: false, // No agrega columnas de fecha por defecto
    tableName: "roles", // Nombre explícito de la tabla en la base de datos
  }
);

module.exports = Role;
