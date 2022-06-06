const express = require('express');
const router = express.Router();
const db = require("../lib/db");

router.post('/free/create', (req, res) => {
    const post = req.body;
    const { memberId, title, description, useComment, disabled } = post;

    if (!memberId || !title || !description || !useComment || !disabled) {
        return res.send({
            success: false,
            message: 'something wrong'
        })
    }

    db.query(`INSERT INTO free (memberId, title, description, useComment, disabled, createdAt, code)
              VALUES (?, ?, ?, ?, ?, Now(), 1)`,
        [memberId, title, description, useComment, disabled],
        (error, result) => {
            if (error) {
                res.send({
                    success : false,
                    message : 'sql error'
                })
                throw error;
            }
            res.send({
                success : true,
                topicId : result.insertId
            })
        }
    )
})


module.exports = router;