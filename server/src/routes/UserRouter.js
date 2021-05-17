const { Router } = require("express");
const UserController = require('../controllers/UserController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");
// const PermissionController = require('../controllers/PermissionController')

const router = new Router();

router.get("/user/:id", AuthMiddleware.Auth, UserController.findById);
router.get("/user/", AuthMiddleware.Auth, UserController.findByEmail);
router.get("/users/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-users'), UserController.findAll);
router.post("/user/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('create-users'), UserController.create);
router.patch("/user/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('edit-users'), UserController.update);
router.delete("/user/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('delete-users'), UserController.delete);
// router.get("/user/:id/permission", AuthMiddleware.Auth, PermissionController.findByUser);

module.exports = router;