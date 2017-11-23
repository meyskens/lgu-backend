const mongoose = require("mongoose")
mongoose.set("debug", true) // Hey this is not prodution!
module.exports = mongoose.createConnection(`mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.MONGOHOST}:${process.env.MONGOPORT}/${process.env.MONGODB}`) // Pass connection onwards