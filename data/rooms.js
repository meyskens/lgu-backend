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
    return RoomModel.findOne({  _id: new Schema.Types.ObjectId(id) })
}

module.exports.remove = (id) => {
    return RoomModel.remove({  _id: new Schema.Types.ObjectId(id) }).exec()
}

module.exports.add = (room) => {
    for (let id in room.dependsOn) {
        if (room.dependsOn.hasOwnProperty(id)) {
            room.dependsOn[id] = new Schema.Types.ObjectId(room.dependsOn[id]._id)
        }
    }
    return RoomModel(room).save()
}

module.exports.update = (room) => {
    room._id = new Schema.Types.ObjectId(room._id)
    RoomModel.update({ _id: room._id }, room).exec()
}
