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
    return RoomModel.find({})
}

module.exports.get = (id) => {
    return RoomModel.findOne({  _id: id})
}

module.exports.remove = (id) => {
    return RoomModel.remove({  _id: id }).exec()
}

module.exports.add = (room) => {
    return RoomModel(room).save()
}

module.exports.update = (room) => {
    RoomModel.update({ _id: room._id }, room, { overwrite: true }).exec()
}
