const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

userSchema.pre('save', function( next ){
    const user = this;
    if(user.isModified('password')){

        bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
            // bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            //     // Store hash in your password DB.
            // });
        });

    }
    else{
        next()
    }

})

userSchema.methods.comparePassword = function(plainPassword, callback){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    })
}

userSchema.methods.generateToken = function(callback){
    const user = this;
    // jsonwebtoken을 이용해서 token을 생성하기
    const token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null, user);
    })
}

userSchema.statics.findByToken = function (token, callback){
    const user = this;

    //클라이언트에서 가지고온 토큰을 디코딩 한다
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가지고 온 토큰과 DB에 보관된 토큰이 일지 하는지 확인.
        user.findOne({ "_id" : decoded, "token" : token }, function(err, user){
            if(err) return callback(err);
            callback(null, user); 
        })
    });
    // jwt.verify(token, 'shhhhh', function(err, decoded) {
    //     console.log(decoded.foo) // bar
    // });
}

const User = mongoose.model('User', userSchema)

module.exports = {User}