const express = require('express');
const router = express.Router();
const db = require("../lib/db");
const path = require("path");

router.post('/update/:comment_id', (req, res) => {
    const post = req.body;
    const {id, description, memberId, topicId} = post;

    if (!id || !description || !memberId || !topicId) {
        return res.send({
            success: false,
            message: 'something wrong'
        })
    }

    function timestamp() {
        const today = new Date();
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace('T', ' ').substring(0, 19);
    }

    db.query(`UPDATE comment SET description=?, updateAt=? WHERE id =?`, [description, timestamp(), id],
        (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: 'sql error'
                })
                throw error;
            }
            res.send({
                success: true,
                message: 'success update Comment!'
                // topicId: result.insertId
            })
        })
})

router.post('/create', (req, res) => {
    const post = req.body;
    const {description, memberId, topicId} = post;

    if (!description || !memberId || !topicId) {
        return res.send({
            success: false,
            message: 'something wrong'
        })
    }

    db.query(`INSERT INTO comment (description, createdAt, memberId, topicId)
              VALUES (?, Now(), ?, ?)`,
        [description, memberId, topicId],
        (error, result) => {
            if (error) {
                res.send({
                    success: false,
                    message: 'sql error'
                })
                throw error;
            }
            res.send({
                success: true,
                message: 'success create Comment!'
                // topicId: result.insertId
            })
        }
    )
})

router.get('/:free_id', (req, res, next) => {
    const freeId = path.parse(req.params.free_id).base;

    const sqlQuery = `SELECT C.id, description, createdAt, updateAt, M.nickname, memberId, topicId
                      FROM comment as C
                               LEFT JOIN member as M ON C.memberId = M.id
                      WHERE C.topicId = ?`;

    db.query(sqlQuery, [freeId], (error, rows) => {
            if (error) {
                res.send({
                    success: false,
                    message: 'sql Error'
                })
                return next(error);
            }
            res.send({
                success: true,
                message: rows
            })
            // res.send(html);
        }
    )
});


module.exports = router;