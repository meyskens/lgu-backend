const email = require("../services/email")

module.exports = ({ app, wrap }) => {
    app.get("/v1/test", async (req, res) => {
        await email.send("maartje@eyskens.me", "hello", "Java sucks!")
    })
}