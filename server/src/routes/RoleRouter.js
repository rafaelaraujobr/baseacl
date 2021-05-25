const { Router } = require("express");
const RoleController = require('../controllers/RoleController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

router.get("/v1/role/:id", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-roles'), RoleController.findById);
router.get("/v1/role/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('view-roles'), RoleController.findAll);
router.post("/v1/role/", AuthMiddleware.Auth, AuthMiddleware.permissionAuth('create-roles'), RoleController.create);

module.exports = router;