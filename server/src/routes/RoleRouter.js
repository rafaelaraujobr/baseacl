const { Router } = require("express");
const RoleController = require('../controllers/RoleController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

router.get("/role/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-roles'), RoleController.findById);
router.get("/role/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-roles'), RoleController.findAll);
router.post("/role/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('create-roles'), RoleController.create);

module.exports = router;