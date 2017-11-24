const reservations = require("../data/reservations")
const users = require("../data/users")

module.exports = ({ app, wrap }) => {
    app.get("/v1/reservations", wrap(async (req,res) => {
        return res.json(await reservations.getAll())
    }))

    app.put("/v1/user/reservations", wrap(async (req, res) => {
        const user = await user.get(req.user.email)
        req.body.user = user._id
        await reservations.add(req.body)
    }))
}