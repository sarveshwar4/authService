const express = require('express');
const router = express.Router();
const userController = require("../../controller/user-controler");
const { AuthRequestValidator } = require("../../middleware/index");
router.post("/signUp",AuthRequestValidator.validateUserAuth, userController.create);
router.post("/signIn",AuthRequestValidator.validateUserAuth, userController.singIn);
router.get("/isAuthenticated", userController.isAuthenticated);

module.exports = router;