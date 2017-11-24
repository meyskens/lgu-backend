const db = require("./mongodb")
const Schema = require("mongoose").Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: String,
    firstName: String,
    lastName: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    contact: {
        type: String,
        enum: ["email", "sms"],
        default: "email",
    }
}, { collection: "users" }) 

UserSchema.index({
    email: 1,
})

const UserModel = db.model("users", UserSchema, "users")

module.exports.checkLogin = async (email, password) => { 
    const user = await UserModel.findOne({ email }) 
    if (user == null) {
        return false
    }
    return await bcrypt.compare(password, user.password)
}

module.exports.get = (email) => {
    return UserModel.findOne({ email })
} 

module.exports.add = async (user) => {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    return (new PersonModel(user)).save()
}
