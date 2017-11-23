const mongoose = require("mongoose")
mongoose.set("debug", true) // Hey this is not prodution!
module.exports = mongoose.createConnection(process.env.MONGODB) // Pass connection onwards