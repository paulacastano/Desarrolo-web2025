const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");
const Project = require("./project.model");

/**
 * Definición del modelo "UserProject" que representa la tabla intermedia "usuarios_proyecto".
 * Relaciona usuarios y proyectos en una relación muchos a muchos.
 */
const UserProject = sequelize.define(
  "usuarios_proyecto",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
      foreignKey: "usuario_id",
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "proyectos", key: "id" },
      foreignKey: "proyecto_id",
    },
  },
  {
    timestamps: false, // No se crean campos createdAt ni updatedAt
    tableName: "usuarios_proyecto", // Nombre de la tabla en la base de datos
  }
);

/// Relación: Un usuario puede estar en muchos proyectos y un proyecto puede tener muchos usuarios.
/// Esta relación se maneja a través de la tabla intermedia "usuarios_proyecto".

User.belongsToMany(Project, {
  through: UserProject,
  foreignKey: "usuario_id",
  as: "proyectos",
});

Project.belongsToMany(User, {
  through: UserProject,
  foreignKey: "proyecto_id",
  as: "usuarios",
});

module.exports = UserProject;
