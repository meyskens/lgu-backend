module.exports = ({ app }) => {
    app.get("/", (req, res) => {
        res.send("Hello world, let's serve urban!")
    })
}