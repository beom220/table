const express = require('express');
const comment = require('./comment');
const topics = require("./topics");
const register = require("./register");
const router = express.Router();

router.use("/comment", comment);
router.use("/topics", topics);
router.use("/register", register);


module.exports = router;