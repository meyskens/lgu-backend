const express = require("express")
const app = express()

app.listen(8080, () => {
    console.log("Server started")
})

app.get("/", (req, res) => {
    res.send("Hello world, let's serve urban!")
})