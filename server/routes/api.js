const express = require('express');
const topics = require("./topics");
const register = require("./register");
const router = express.Router();

router.use("/topics", topics);
router.use("/register", register);


module.exports = router;