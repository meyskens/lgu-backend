const db = require("./mongodb")
const Schema = require("mongoose").Schema

const RoomSchema = new Schema({
    name: String,
    width: Number,
    height: Number,
    length: Number,
    location: String,
    description: String,
    dependsOn: [
        {
            type: Schema.Types.ObjectId,
            ref: "rooms",
        },
    ],
}, { collection: "rooms" }) 

const RoomModel = db.model("rooms", RoomSchema, "rooms")

module.exports.getAll = () => {
    return RoomModel.findOne({})
}
module.exports.get = (id) => {
    return RoomModel.find({  _id: new Schema.Types.ObjectId(id) })
}