const mongoose = require("mongoose")
mongoose.set("debug", true) // Hey this is not prodution!
module.exports = mongoose.createConnection("mongodb://127.0.0.1/test") // Pass connection onwards