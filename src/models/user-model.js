const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        max: 20
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        max: 20
    },
    userName: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        max: 20
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contact: {
        type: String,
        require: true
    },
    profilePhoto: {
        type: String
    }

}, {timestamps: true})

// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10)
// })

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password)
    }
}

userSchema.virtual('fullName')
.get(function(){
   return `${this.lastName} ${this.firstName}`
})

module.exports = mongoose.model('User', userSchema)