const { Router } = require("express");
const PermissionController = require('../controllers/PermissionController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

router.get("/permission/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-permissions'), PermissionController.findById);
router.get("/permission/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-permissions'), PermissionController.findAll);
router.post("/permission/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('create-permissions'), PermissionController.create);

module.exports = router;