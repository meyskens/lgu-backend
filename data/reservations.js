import { Stream } from "stream";

const db = require("./mongodb")
const Schema = require("mongoose").Schema

const ReservationSchema = new Schema({
    reason: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "rooms",
    },
    from: Date,
    to: Date,
    feedback: String,
}, { collection: "reservations" }) 


const ReservationModel = db.model("reservations", RoomSchema, "reservations")
