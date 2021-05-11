const { Router } = require("express");
const AccountController = require('../controllers/AccountController')

const router = new Router();

router.post("/account/", AccountController.create);


module.exports = router;