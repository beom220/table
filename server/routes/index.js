const express = require("express");
const router = express.Router();
const register = require("./register");
const topics = require("./topics");
const api = require("./api");

const root = require("path").join(__dirname, "../../client/build");


router.use('/api', api);

router.get("*", (req, res) => {
    res.sendFile("index.html", { root });
    // res.send(req.user);
})

// app.get("*", (req, res) => {
//     res.sendFile("index.html", { root });
// });

module.exports = router;


