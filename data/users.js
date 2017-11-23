const db = require("./mongodb")
const Schema = require("mongoose").Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: String,
    password: String,
}, { collection: "users" }) 

UserSchema.index({
    email: 1,
});

const UserModel = db.model("users", UserSchema, "users")

module.exports.checkLogin = async (email, password) => { 
    const user = await PersonModel.findOne({ email }) 
    if (user == null) {
        return false
    }
    return await bcrypt.compare(password, user.password)
}

module.exports.addUser = async (user) => {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    return (new PersonModel(user)).save()
}