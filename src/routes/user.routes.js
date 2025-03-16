//se enviara el email y la contraseña que fue lo que colocamos

const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user.controllers");
router.post("/users", createUser);

module.exports = router;

//definimos la ruta que vamos a conseguir
