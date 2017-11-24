const nodemailer = require("nodemailer")
const sender = '"LGU TEST SERVER" <lookatme@lgu.dispatch.sh>'

let transporter

(async () =>{
    const account = await nodemailer.createTestAccount() // Dear future user, please replace me with a real server! I want to be a real app
    console.log(account)
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });
})()

console.log("load")

module.exports.send = (to, subject, message) => {
    console.log("send")
    return transporter.sendMail({
        from: sender, // sender address
        to, // list of receivers
        subject, // Subject line
        text: message, // plain text body
    })
}