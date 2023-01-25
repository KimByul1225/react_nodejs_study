const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리르 하는 곳

    // 클라이언트 쿠키에서 토큰을 가지고온다.
    let token = req.cookies.x_auth;

    // 가지고 온 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        })
        //req에 token과 user정보를 넣어주는 이유는 route에서 해당 정보를 사용할 수 있도록 하기 위함.
        req.token =  token;
        req.user = user;

        //next 이유는 auth는 middleware이기 때문에 middleware에서 다음으로 갈수 있도록.
        next();
    })

    //유저가 있으면 인증 성공

    //유저가 없으면 인증 실패
}

module.exports = {auth}; 