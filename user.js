

const schema = require('mongoose')

const UserSchema = new schema.Mongoose.Schema({
    email:String,
    password:String,
    
})

const User = mongoose.model('User',UserSchema)
 module.exports = User
