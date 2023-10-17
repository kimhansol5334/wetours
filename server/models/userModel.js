const crypto = require('crypto');
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator') 
const bcrypt = require('bcryptjs')

//       FAT MODEL THIN CONTROLLER!!!!!!!! //

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'An user must have a name!'],
        // unique: true
    },
    email: {
        type: String,
        required: [true, 'An user must have an email adress!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },
    photo: {
        type:String,
        default: 'user.jpg'
    },
    role:{
        type:String,
        enum:['user','guide', 'lead-guide', 'admin'],
        default: 'user'
    },

    password: {
        type: String,
        required: [true, 'An user must have a password!'],
        minlength: 8,
        select:false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'An user must have a confirmed password '],
        minlength: 8,
        validate: {
            validator: function(el) {
                return el === this.password // This only works on Create and Save!!! (Update is not gonna work.)
            },
            message: 'Passwords are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type:Boolean,
        default: true,
        select: false
    }
})

// Todays homework! lets learn how this works
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.isNew) return next();

    // 이미 해시된 비밀번호인지 확인

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.pre(/^find/, function(next) {
  this.find({active: {$ne: false}});
  next();
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    bcrypt.compare('test1234', "$2a$12$Q0grHjH9PXc6SxivC8m12.2mZJ9BbKcgFpwSG4Y1ZEII8HJVzWeyS"
    , function(err, res) {
        if (err) {
            console.error(err);
        } else {
            console.log(res);  // 이 값이 true가 되어야 함
        }
    });
    return await bcrypt.compare(candidatePassword, userPassword);
  };

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000 , 10)

        // console.log(changedTimestamp, JWTTimestamp)
        return JWTTimestamp < changedTimestamp;
    }
    
    return false
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log({resetToken}, this.passwordResetToken)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
     return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
