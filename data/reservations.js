import { Stream } from "stream";

const db = require("./mongodb")
const Schema = require("mongoose").Schema

const ReservationSchema = new Schema({
    reason: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "rooms",
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        required: true,
    },
}, { collection: "reservations" }) 


const ReservationModel = db.model("reservations", RoomSchema, "reservations")

module.exports.getAll = () => {
    return ReservationModel.find({})
}
