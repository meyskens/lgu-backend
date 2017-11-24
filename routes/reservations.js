const reservations = require("../data/reservations")
const users = require("../data/users")
const nofify = require("../service/nofify")

module.exports = ({ app, wrap }) => {
    app.get("/v1/reservations", wrap(async (req,res) => {
        return res.json(await reservations.getAll())
    }))

    app.post("/v1/user/reservations", wrap(async (req, res) => {
        const user = await user.get(req.user.email)
        req.body.user = user._id
        return res.json(await reservations.add(req.body))
    }))

    app.patch("/v1/admin/reservations/:id", wrap(async (req, res) => {
        req.body._id = req.params.id
        await reservations.update(req.body)
        if (req.body.confirmed) {
            await nofify.notifyConfirmed(reservation.user, reservation)
        }
        return res.json({ result: "ok" })
    }))

    app.delete("/v1/admin/reservations/:id", wrap(async (req, res) => {
        const reservation = await reservations.get(req.params.id)
        if (!reservation) {
            return res.status(400).json({ error: "reservation not found" })
        }
        await nofify.notifyDeclined(reservation.user, reservation)
        await reservations.remove(req.params.id)

        return res.json({ result: "ok" })
    }))
}