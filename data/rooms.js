const db = require("./mongodb")
const Schema = require("mongoose").Schema

const RoomSchema = new Schema({
    name: String,
    width: Number,
    height: Number,
    location: String,
    description: String,
}, { collection: "rooms" }) 

RoomSchema.index({
    email: 1,
});

const RoomModel = db.model("rooms", RoomSchema, "room")
