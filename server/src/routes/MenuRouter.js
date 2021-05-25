const { Router } = require("express");
const MenuController = require('../controllers/MenuController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

router.get("/v1/menus/", AuthMiddleware.Auth, MenuController.findAll);
router.get("/v1/menu/", AuthMiddleware.Auth, MenuController.findBySlugPermission);

module.exports = router;