const sms = require("./sms")
const email = require("./email")


module.exports.notifyDeclined = (user, reservation) => {
    const message = `Hello from LGU \nYour reservation for ${reservation.room.name} has been declined`
    if (user.contact === "sms") {
        return sms.send(user.phone, message)
    }
    if (user.contact === "email") {
        return email.send(user.email, "Your reservation has been declined", message)
    } 
}

module.exports.notifyConfirmed = (user, reservation) => {
    const message = `Hello from LGU \nYour reservation for ${reservation.room.name} has been confirmed`
    if (user,contact === "sms") {
        return sms.send(user.phone, message)
    }
    if (user.contact === "email") {
        return email.send(user.email, "Your reservation has been confirmed", message)
    }
}