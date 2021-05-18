const { Router } = require("express");
const AccountController = require('../controllers/AccountController')
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = new Router();

router.post("/account/", AccountController.create);
router.post("/account/login", AccountController.login);
router.get("/account/authorization", AuthMiddleware.Auth, AccountController.authorization)


module.exports = router;