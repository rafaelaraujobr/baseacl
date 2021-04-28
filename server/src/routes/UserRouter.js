const { Router } = require("express");
const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

const router = new Router();

router.get("/user/:id", UserController.findById);
router.get("/user/", UserController.findByEmail);
router.post("/user/", UserController.create);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
router.post("/session/", SessionController.create);

module.exports = router;