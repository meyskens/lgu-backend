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
        required: false,
    },
    confirmed: {
        type: Boolean,
        required: true,
    },
}, { collection: "reservations" }) 

ReservationSchema.path('to').expires('60d');

const ReservationModel = db.model("reservations", ReservationSchema, "reservations")

module.exports.getAll = () => {
    return ReservationModel.find({}).populate("user").populate("room").exec()
}

module.exports.get = (id) => {
    return ReservationModel.findOne({  _id: new Schema.Types.ObjectId(id) }).populate("user").populate("room").exec()
}

module.exports.remove = (id) => {
    return ReservationModel.remove({  _id: new Schema.Types.ObjectId(id) }).exec()
}

module.exports.add = (reservation) => {
    //reservation.user = new Schema.Types.ObjectId(reservation.user)
    //reservation.room = new Schema.Types.ObjectId(reservation.room)
    return ReservationModel(reservation).save()
}

module.exports.update = (reservation) => {
    reservation._id = new Schema.Types.ObjectId(reservation._id)
    RoomModel.update({ _id: reservation._id }, reservation).exec()
}

module.exports.isTimeAvailable = (roomId, start, end) => {
    roomId = new Schema.Types.ObjectId(roomId)
    const reservations = RoomModel.find({
        room: roomId,
        $or: [
            { startTime: { $gte: start, $lte: end } },
            { endTime: { $gte: start, $lte: end } },
        ],
    }).populate("user").populate("room").exec()
    
    return reservations.length() == 0
}