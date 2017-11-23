const db = require("./mongodb")
const Schema = require("mongoose").Schema

const UserSchema = new Schema({
    email: String,
    password: String,
}, { collection: "users" }) 

UserSchema.index({
    email: 1,
});

const UserModel = db.model("users", UserSchema, "users")

module.exports.getPersonByName = (name) => { 
    return PersonModel.findOne({ name }) 
}

module.exports.addUser = (user) => {
    return (new PersonModel(user)).save()
}