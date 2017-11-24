const rooms = require("../data/rooms")
const reservations = require("../data/reservations")

module.exports = ({ app, wrap }) => {
    app.get("/v1/rooms", wrap(async (req,res) => {
        return res.json(await rooms.getAll())
    }))

    app.get("/v1/rooms/:id", wrap(async (req,res) => {
        return res.json(await rooms.get(req.params.id))
    }))

    app.get("/v1/rooms/:id/available", wrap(async (req,res) => {
        return res.json({ available: await reservations.isTimeAvailable(req.params.id, new Date(req.query.start), new Date(req.query.end)) })
    }))

    app.post("/v1/admin/rooms", wrap(async (req, res) => {
        return res.json(await rooms.add(req.body))
    }))

    app.put("/v1/admin/rooms", wrap(async (req, res) => {
        return res.json(await rooms.update(req.body))
    }))

    app.delete("/v1/admin/rooms/:id", wrap(async (req, res) => {
        await rooms.delete(req.params.id)
        return res.json({ result: "ok" })
    }))
    
}