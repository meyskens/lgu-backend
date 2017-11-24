const sms = require("./services/sms")

module.exports = ({ app, wrap }) => {
    app.get("/v1/test/sms", wrap(async(req, res) => {
        await sms.send("+32498645061", "Hello form LGU. Your reservation of BEMT Japan is declined")
        return res.send("ok")
    }))
}