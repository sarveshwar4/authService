const express = require('express');
const router = express.Router();
const userController = require("../../controller/user-controler");

router.post("/signUp", userController.create);
router.post("/signIn", userController.singIn);
router.get("/isAuthenticated", userController.isAuthenticated);

module.exports = router;