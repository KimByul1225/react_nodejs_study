const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        if(err) return callback(err),
            callback(null, isMatch)
    })
}

// userSchema.methods,generateToken = function

const User = mongoose.model('User', userSchema)

module.exports = {User}