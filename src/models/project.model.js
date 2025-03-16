const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definición del modelo "Proyect" que representa la tabla "proyectos"
const Proyect = sequelize.define(
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
      afterCreate: (proyect, options) => {
        if (proyect.fecha_creacion) {
          proyect.fecha_creacion.setHours(proyect.fecha_creación.getHous() - 5);
        }
      },
    },
  }
);

module.exports = Proyect;
