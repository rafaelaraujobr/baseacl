const { Router } = require("express");
const AccountController = require('../controllers/AccountController')

const router = new Router();

router.post("/account/", AccountController.create);
router.post("/account/login", AccountController.login);


module.exports = router;