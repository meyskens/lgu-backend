const users = require("../data/users")

module.exports = ({ app, wrap }) => {
    app.get("/v1/user/info", wrap(async (req, res) => {
        if (!req.user.email) {
            return res.status(400).json({ "error":"Bad user session" })
        }
        const user = await users.getUser(req.user.email)
        delete user.password
        res.json(user)
    }))
}