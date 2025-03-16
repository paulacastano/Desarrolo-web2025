const User = require("./user.model");
const Project = require("./project.model");
const UserProject = require("./userProject.model");

// Relación muchos a muchos: Un usuario puede estar en varios proyectos y un proyecto puede tener varios usuarios

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

// Relación uno a muchos: Un proyecto pertenece a un solo administrador (usuario)
Project.belongsTo(User, {
  foreignKey: "administrador_id",
  as: "administrador",
});

module.exports = { User, Project, UserProject };
