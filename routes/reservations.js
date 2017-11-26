const reservations = require("../data/reservations")
const users = require("../data/users")
const nofify = require("../services/notify")

module.exports = ({ app, wrap }) => {
    app.get("/v1/reservations", wrap(async (req,res) => {
        return res.json(await reservations.getAllWithoutUser())
    }))

    app.post("/v1/user/reservations", wrap(async (req, res) => {
        const user = await users.get(req.user.email)
        if (!(await reservations.isTimeAvailable(req.body.room, req.body.from, req.body.to))) {
            return res.status(400).json({ error: "scheduling conflict" })
        }
        req.body.user = user._id
        req.body.confirmed = false
        return res.json(await reservations.add(req.body))
    }))

    app.patch("/v1/admin/reservations/:id", wrap(async (req, res) => {
        req.body._id = req.params.id
        await reservations.update(req.body)
        if (req.body.confirmed) {
            nofify.notifyConfirmed(reservation.user, reservation)
        }
        return res.json({ result: "ok" })
    }))

    app.delete("/v1/admin/reservations/:id", wrap(async (req, res) => {
        const reservation = await reservations.get(req.params.id)
        if (!reservation) {
            return res.status(400).json({ error: "reservation not found" })
        }
        nofify.notifyDeclined(reservation.user, reservation)
        await reservations.remove(req.params.id)

        return res.json({ result: "ok" })
    }))

    app.get("/v1/admin/reservations", wrap(async (req,res) => {
        return res.json(await reservations.getAll())
    }))
}