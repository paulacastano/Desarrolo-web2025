const ROLES = require("../utils/constants");

exports.createProject = async (data) => {};

exports.getProjects = async () => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: "administrador",
          attributes: ["id", "nombre"],
        },
        {
          model: User,
          as: "usuarios",
          attributes: ["id", "nombre", "email"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return projects;
  } catch (error) {
    throw error;
  }
};
