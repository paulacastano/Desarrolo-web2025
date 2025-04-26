const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/**
 * Definición del modelo "User" que representa la tabla "usuarios".
 * Cada usuario tiene un nombre, correo electrónico, contraseña, rol y opcionalmente un administrador asociado.
 */
const User = sequelize.define(
  "usuarios",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "id" },
    },
    administrador_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "usuarios", key: "id", onDelete: "SET NULL" },
    },
  },
  {
    timestamps: false,
    tableName: "usuarios",
  }
);

module.exports = User;
