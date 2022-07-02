const express = require('express');
const router = express.Router();
const db = require("../lib/db");
const path = require("path");

// router.post('/free/update/:free_id', (req, res) => {
//     const freeId = path.parse(req.params.free_id).base;
//     const post = req.body;
//     const {memberId, title, description, useComment, disabled} = post;
//
//     if (!memberId || !title || !description || !useComment || !disabled) {
//         return res.send({
//             success: false,
//             message: 'something wrong'
//         })
//     }
//     //
//     // db.query(`UPDATE member SET nickname=?, password=? WHERE id=?`, [nickname,password,id], (err, result)=>{
//     //
//
//     db.query(`UPDATE free SET title=?, description=?, useComment=?, disabled=?, updateAt where id=?`,
//         [ title, description, useComment, disabled, ], (error, result) => {
//             if (error) {
//                 res.send({
//                     success: false,
//                     message: 'sql error'
//                 })
//                 throw error;
//             }
//             res.send({
//                 success: true,
//                 topicId: result.insertId
//             })
//         }
//     )
// })

router.post('/free/create', (req, res) => {
    const post = req.body;
    const {memberId, title, description, useComment, disabled} = post;

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
                    success: false,
                    message: 'sql error'
                })
                throw error;
            }
            res.send({
                success: true,
                topicId: result.insertId
            })
        }
    )
})

//
router.get('/free/:free_id', (req, res, next) => {
    const freeId = path.parse(req.params.free_id).base;

    const sqlQuery = `SELECT free.id, title, description, useComment, disabled, free.createdAt, member.nickname, memberId
                      FROM free
                               LEFT JOIN member ON free.memberId = member.id
                      WHERE free.id = ?`;

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
                message: rows[0]
            })
            // res.send(html);
        }
    )
});

router.get('/free', (req, res, next) => {
    // const sqlQuery = `SELECT free.id, title, description, nickname
    //                   FROM free LEFT JOIN member ON free.memberId = member.id`;
    const sqlQuery = `SELECT free.id, title, description, useComment, disabled, free.createdAt, member.nickname, memberId
                      FROM free
                               LEFT JOIN member ON free.memberId = member.id WHERE disabled='0' ORDER BY createdAt DESC`;
    db.query(sqlQuery, (error, rows) => {
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