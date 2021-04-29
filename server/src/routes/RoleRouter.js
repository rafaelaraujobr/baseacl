const { Router } = require("express");
const RoleController = require('../controllers/RoleController')

const router = new Router();

router.get("/role/:id", RoleController.findById);
router.get("/role/", RoleController.findAll);
router.post("/role/", RoleController.create);

module.exports = router;