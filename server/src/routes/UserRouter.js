const { Router } = require("express");
const UserController = require('../controllers/UserController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");
// const PermissionController = require('../controllers/PermissionController')

const router = new Router();

router.get("/v1/user/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-users'), UserController.findById);
router.get("/v1/user/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-users'), UserController.findByEmail);
router.get("/v1/users/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-users'), UserController.findAll);
router.post("/v1/user/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('create-users'), UserController.create);
router.patch("/v1/user/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('edit-users'), UserController.update);
router.delete("/v1/user/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('delete-users'), UserController.delete);
// router.get("/user/:id/permission", AuthMiddleware.Auth, PermissionController.findByUser);

module.exports = router;