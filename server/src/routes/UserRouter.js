const { Router } = require("express");
const UserController = require('../controllers/UserController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

router.get("/user/:id", AuthMiddleware.Auth, UserController.findById);
router.get("/users/", AuthMiddleware.Auth, UserController.findAll);
router.get("/user/", AuthMiddleware.Auth, UserController.findByEmail);
router.post("/user/", AuthMiddleware.Auth, UserController.create);
router.patch("/user/:id", AuthMiddleware.Auth, UserController.update);
router.delete("/user/:id", AuthMiddleware.Auth, UserController.delete);

module.exports = router;