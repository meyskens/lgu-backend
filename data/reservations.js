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
}, { collection: "reservations" }) 


const ReservationModel = db.model("reservations", RoomSchema, "reservations")
