const express = require("express");
const router = express.Router();
const register = require("./register");
const topics = require("./topics");


// router.use("/member", member);
router.use("/topics", topics);
router.use("/register", register);
router.get("*", (req, res) => {
    res.send(req.user);
})

module.exports = router;


