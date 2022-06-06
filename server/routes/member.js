const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bcrypt = require("bcrypt");

module.exports = (passport) => {
    router.get('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) next(err);
            req.session.save(() => {
                res.send({
                    success: true,
                    message : 'logout'
                });
            })
        });
    })
    //
    router.post('/update', (req,res, next) =>{
        const post = req.body;
        const {id, nickname} = post;
        let {password} = post;

        password = bcrypt.hashSync(password, 10);
        db.query(`UPDATE member SET nickname=?, password=? WHERE id=?`, [nickname,password,id], (err, result)=>{
            if(err) {
                next(err);
                return res.send({
                    success: false,
                    message: 'sql error'
                })
            }

            req.logout((err2) => {
                if (err2) {
                    res.send({
                        success: false,
                        message : 'logout failed'
                    });
                    return next(err2)
                }
                req.session.save(() => {
                    return res.send({
                        success: true,
                        message : 'update, and logout'
                    });
                })
            });

            // TODO 업데이트된 정보로 로그인..?
        })
    })
    //
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            console.log('session : ',req.session);
            if (err) {
                res.send({message: 'error'})
                return next(err)
            }

            if (!user) {
                return res.send({
                    success: false,
                    message: 'NotUser'
                })
            }

            req.login(user, (err) => {
                if (err) return next(err);

                return res.send({
                    success: true,
                    message: 'user',
                    user: {
                        id: user.id,
                        email: user.email,
                        nickname: user.nickname,
                        grade : user.grade,
                        // session : req.session
                    }
                })
            })
        })(req, res, next);
    })

    router.get('/', (req, res,next) => {
        if (!req.user) {
            return res.send({
                success: false,
            })
        }
        passport.authenticate('local', (err, user) => {
            return res.send({
                success: true,
                user: {
                    email: user.email,
                    nickname: user.nickname,
                }
            })
        })(req, res, next);

    })
    return router;
}


// const post = req.body;
// const { email, password } = post;
//
// if( !email || !password ){
//     return res.send({
//         success : false,
//         message : 'null'
//     })
// }
// db.query(`SELECT email FROM member`, (err, rows) => {
//     const user = rows.filter(v => email === v.email);
//     if(!user.length){
//         return res.send({
//             success : false,
//             message : 'wrong email'
//         })
//     }
//     db.query(`SELECT email, password, nickname FROM member WHERE email=?`,[email], (err, result) => {
//         const exact = bcrypt.compareSync(password, result[0].password);
//         if(!exact){
//             return res.send({
//                 success : false,
//                 message : 'wrong password'
//             })
//         }
//         return req.login(result[0], (err)=>{
//             res.send({
//                 success : true,
//                 message : 'welcome',
//                 user : {
//                     nickname: result[0].nickname,
//                     email : result[0].email
//                 }
//             })
//         });
//     })
// })



