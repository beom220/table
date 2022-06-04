const passport = require("passport");
const {Strategy: LocalStrategy} = require("passport-local");
const db = require('./db');
const bcrypt = require('bcrypt');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    //  전달받은 data를 세션Store에 저장
    passport.serializeUser((user, done) => {
        // 유저가 아니면 세션 생성 안함
        if(!user){
            return done(null, false, {message : 'is not user'})
        }
        console.log('serializeUser : ',user)
        done(null, user.email);
    });
    //  페이지방문시 세션Store정보를 조회
    passport.deserializeUser((id, done) => {
        console.log('deserializeUser : ', id);
        db.query(`SELECT email
                  FROM member
                  WHERE email = ?`, [id], (err, user) => {
            if (err) return done(null, false, {message: 'Sql Error'});
            done(null, user[0]);
        })
    })

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (email, password, done) => {
            db.query(`SELECT email
                      FROM member`, (err, rows) => {
                if (err) return done(null, false, {message: 'Sql Error'});
                // email 전체를 가져와서 입력값이 일치하는것 배열로 저장
                const user = rows.filter(v => v.email === email);
                // 값이 없다면 이메일 에러
                if (!user.length) return done(null, false, {message: 'email error'});

                db.query(`SELECT email, password, id, nickname, grade
                          FROM member
                          WHERE email = ?`, [email], (err2, row) => {
                    if (err2) return done(null, false, {message: 'Sql Error'});

                    // 비밀번호 비교, 일치 = true, 불일치 = false
                    const exact = bcrypt.compareSync(password, row[0].password);
                    if (!exact) return done(null, false, {message: 'error pw'});
                    return done(null, row[0]);
                })
            })
        }
    ))
    return passport;
}