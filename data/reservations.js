const db = require("./mongodb")
const Schema = require("mongoose").Schema
const rooms = require("./rooms")

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

module.exports.getAllWithoutUser = () => {
    return ReservationModel.find({}).populate("room").exec()
}

module.exports.get = (id) => {
    return ReservationModel.findOne({  _id: id }).populate("user").populate("room").exec()
}

module.exports.remove = (id) => {
    return ReservationModel.remove({  _id: id }).exec()
}

module.exports.add = (reservation) => {
    return ReservationModel(reservation).save()
}

module.exports.update = (reservation) => {
    ReservationModel.update({ _id: reservation._id }, reservation, { overwrite: true }).exec()
}

module.exports.isTimeAvailable = async (roomId, start, end) => {
    const room = await rooms.get(roomId)
   
    const reservations = []
    reservations.concat(await ReservationModel.find({
        room: roomId,
        $or: [
            { startTime: { $gte: start, $lte: end } },
            { endTime: { $gte: start, $lte: end } },
        ],
    }).exec())
    
    for (let dependRoom of room.dependsOn) {
        reservations.concat(await ReservationModel.find({
            room: dependRoom,
            $or: [
                { startTime: { $gte: start, $lte: end } },
                { endTime: { $gte: start, $lte: end } },
            ],
        }).exec())
    }
    
    return reservations.length === 0
}