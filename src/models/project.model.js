const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

// Definición del modelo "Project" que representa la tabla "proyectos"
const Project = sequelize.define(
  "proyectos",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    administrador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
    },
  },
  {
    timestamps: false, // Desactiva los timestamps automáticos (createdAt, updatedAt)
    tableName: "proyectos",
    hooks: {
      afterCreate: (project, options) => {
        if (project.fecha_creacion) {
          project.fecha_creacion.setHours(
            project.fecha_creacion.getHours() - 5
          );
        }
      },
    },
  }
);

Project.belongsTo(User, {
  foreignKey: "administrador_id",
});

User.hasMany(Project, {
  foreignKey: "administrador_id",
  as: "proyectos_administrados",
});

module.exports = Project;
