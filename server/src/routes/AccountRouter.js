const { Router } = require("express");
const AccountController = require('../controllers/AccountController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

router.post("/v1/account/", AccountController.create);
router.post("/v1/account/login", AccountController.login);
router.get("/v1/account/authorization", AuthMiddleware.Auth, AccountController.authorization)
router.post("/v1/account/logout", AuthMiddleware.Auth, AccountController.logout)


module.exports = router;