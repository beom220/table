const express = require("express");
const router = express.Router();
const register = require("./register");
const topics = require("./topics");
const api = require("./api");

router.use('/', api);

module.exports = router;


