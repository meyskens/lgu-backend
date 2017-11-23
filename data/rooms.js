const db = require("./mongodb")
const Schema = require("mongoose").Schema

const RoomSchema = new Schema({
    name: String,
    width: Number,
    height: Number,
    location: String,
    description: String,
    dependsOn: [
        {
            type: Schema.Types.ObjectId,
            ref: "rooms",
        },
    ],
}, { collection: "rooms" }) 

const RoomModel = db.model("rooms", RoomSchema, "room")

module.exports.getAll = () => {
    return RoomModel.find()
}