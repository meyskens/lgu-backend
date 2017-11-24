const rooms = require("../data/rooms")

module.exports = ({ app, wrap }) => {
    app.get("/v1/rooms", wrap(async (req,res) => {
        return res.json(await rooms.getAll())
    }))
    app.get("/v1/rooms/:id", wrap(async (req,res) => {
        return res.json(await rooms.get(req.params.id))
    }))
}