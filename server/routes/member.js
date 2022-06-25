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
                    message : 'logout',
                    user : {},
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
            // console.log('session : ',req.session);
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
                    user : req.user
                    // session : req.session,
                    // user: {
                    //     id: user.id,
                    //     email: user.email,
                    //     nickname: user.nickname,
                    //     grade : user.grade,
                    //     session : req.session
                    // }
                })
            })
        })(req, res, next);
    })

    router.get('/', (req, res,next) => {
        if (!req.user) {
            return res.send({
                success: false,
                user : null
            })
        }
        passport.authenticate('local', (err, user) => {
            console.log(req.session)
            return res.send({
                success: true,
                user : req.user
            })
        })(req, res, next);

    })
    return router;
}



