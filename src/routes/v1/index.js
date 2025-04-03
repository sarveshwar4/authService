const express = require('express');
const router = express.Router();
const userController = require("../../controller/user-controler");

router.post("/signUp", userController.create);

module.exports = router;