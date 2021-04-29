const { Router } = require("express");
const PermissionController = require('../controllers/PermissionController')

const router = new Router();

router.get("/permission/:id", PermissionController.findById);
router.get("/permission/", PermissionController.findAll);
router.post("/permission/", PermissionController.create);

module.exports = router;