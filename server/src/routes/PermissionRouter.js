const { Router } = require("express");
const PermissionController = require('../controllers/PermissionController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

router.get("/v1/permission/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-permissions, view-users'), PermissionController.findById);
router.get("/v1/permission/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-permissions'), PermissionController.findAll);
router.post("/v1/permission/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('create-permissions'), PermissionController.create);

module.exports = router;