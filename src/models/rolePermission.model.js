const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RolePermission = sequelize.define(
  "roles_permisos",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "id" },
    },
    permiso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "permisos", key: "id" },
    },
  },
  {
    timestamps: false,
    tableName: "roles_permisos",
  }
);

module.exports = RolePermission;
