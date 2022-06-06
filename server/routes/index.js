const express = require("express");
const router = express.Router();
const register = require("./register");
const topics = require("./topics");


// router.use("/member", member);
router.use("/topics", topics);
router.use("/register", register);
router.get("/", (req, res) => {
    let user_info = null;
    if(!req.user){
        user_info = [];
    }
    if(req.user){
        user_info = req.user;
    }
    res.send(user_info);
})

module.exports = router;


