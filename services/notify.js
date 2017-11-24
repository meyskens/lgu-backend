const sms = require("./sms")


module.exports.notifyDeclined = (user, reservation) => {
    return sms.send(user.phone, `Hello from LGU \nYour reservation for ${reservation.room.name} has been declined`)
}

module.exports.notifyConfirmed = (user, reservation) => {
    return sms.send(user.phone, `Hello from LGU \nYour reservation for ${reservation.room.name} has been confirmed`)
}