const express = require('express');
const router = express.Router();
const db = require("../lib/db");
const bcrypt = require('bcrypt');


router.post('/', (req, res) => {
    const post = req.body;
    const { name, email, birth, phone, nickname, uEmail } = post;
    let { password } = post;

    if (!name || !email || !password || !birth || !phone || !nickname || !uEmail ) {
        res.send({
            success: false,
            message: 'something wrong'
        })
    }

    db.query(`SELECT email FROM member`, (err, rows) => {
        if (err) throw err;

        const user = rows.filter(row => row.email === email);
        if (!!user.length) {
             res.send({
                success: false,
                message: 'already used'
            });
        }

        password = bcrypt.hashSync(password, 10);
        db.query(`INSERT INTO member (name, email, password, birth, phone, nickname, uEmail,  grade, createAt, agreeAt)
                  VALUES (?, ?, ?, ?, ?, ?, ?, 1, Now(), Now())`,
            [name, email, password, birth, phone, nickname, uEmail],
            (err2, result) => {
                if (err2) throw err2;

                res.send({
                    success: true,
                    message: 'congratulations'
                })
            }
        )
    })
})


module.exports = router;