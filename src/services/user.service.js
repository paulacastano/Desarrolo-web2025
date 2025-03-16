const { emit } = require("process");
const User = require("../models/user.model");
const { where } = require("underscore");
const { NONAME } = require("dns");
const bcrypt = require("bcryptjs");

//Crea un nuevo usuario en la base de datos.
exports.createUser = async (
  nombre,
  email,
  password,
  rol_id,
  administrador_id
) => {
  try {
    // Verificar si el usuario ya existe en la base de datos
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new Error("El usuario ya existe");
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol_id,
      administrador_id,
    });
    return newUser;
  } catch (err) {
    throw new Error(`Error al crear el usuario: ${err.message}`);
  }
};

exports.getAllUserByAdministradorId = async (administrador_id, email) => {
  try {
    const whereClause = { administrador_id };
    if (email) {
      whereClause.email = email;
    }
    const users = await User.findAll({
      where: whereClause,
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (err) {
    throw new Error(`Error al obtener los usuarios: ${err.message}`);
  }
};

exports.getAllUserByRolId = async (rol_id) => {
  try {
    const users = await User.findAll({
      where: { rol_id },
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (err) {
    throw new Error(`Error al obtener los usuarios: ${err.message}`);
  }
};

exports.updateUser = async (
  id,
  nombre,
  email,
  rol_id,
  administrador_id,
  admin_from_token
) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuarios no encontrado");
    }

    if (user.administrador_id !== admin_from_token) {
      throw new Error(
        "Acceso denegado, este usuario no esta bajo su administador"
      );
    }

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        throw new Error("El email ya esta en uso");
      }
    }
    await user.update({
      nombre,
      email,
      rol_id,
      administrador_id,
    });
    return user;
  } catch (err) {
    throw new Error(`Error al actualizar el usuaruio: ${err.message}`);
  }
};

exports.deleteUser = async (id, admin_from_token) => {
  try {
    const user = await User.findByPk(id);
    if (user.administrador_id !== admin_from_token) {
      throw new Error(
        "Accesoo denegado, este usuario no esta bajo su administracion"
      );
    }

    if (!user) {
      throw new Error("Usuario no econtrado");
    }

    await user.destroy();
    return { message: "Usuario eliminado con exito" };
  } catch (err) {
    throw new Error(`Error al eliminar el usuario: ${err.message}`);
  }
};
