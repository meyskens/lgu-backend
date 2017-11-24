const reservations = require("../data/reservations")

module.exports = ({ app, wrap }) => {
    app.get("/v1/reservations", wrap(async (req,res) => {
        return res.json(await reservations.getAll())
    }))
}