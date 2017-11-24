const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_PUBLIC, process.env.TWILIO_PRIVATE);
const from = process.env.PHONENUMBER

module.exports.send = (to, message) => {
    return client.messages.create({ body: message, to, from })
}
