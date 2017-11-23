const fs = require('fs');
const express = require("express")
const app = express()
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("underscore");

// security keys
const publicKey = fs.readFileSync("./keys/publicKey.pem")
const cert = fs.readFileSync("./keys/signingKey.pem")

// db objects
const users = require("./data/users")

// Used in route handlers to catch async exceptions as if they were synchronous.
let wrap = fn => (...args) => fn(...args).catch(args[2])


app.use(cors());
app.options("*", cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use("/v1/user/*", expressJwt({
    secret: publicKey,
    audience: "https://lgu-backend.dispatch.sh/",
}))

app.all("/v1/user/*", (req, res, next) => {
        let [scheme, token] = req.headers.authorization.split(" ");
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(400).json({ "error": "No token was found in the Authorization header." })
        }
        req.token = token
        return next() // allow request to continue
});

app.all("/v1/admin/*", (req, res, next) => {
    let [scheme, token] = req.headers.authorization.split(" ");
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(400).json({ "error": "No token was found in the Authorization header." })
    }
    req.token = token;
    if (!req.user.isAdmin) {
        return res.status(401).json({ "error": "Unauthorized" })
    }
    return next() // allow request to continue
});

app.post("/v1/login", wrap(async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ "error": "missing info" })
    }
   
    const correct = await users.checkLogin(req.body.email, req.body.password)
    if (!correct) {
        return res.status(401).json({
            error: "Wrong login",
            result: "error",
        })
    }

    const user = await users.getUser(req.body.email)

    const token = jwt.sign({
        email: req.body.email,
        isAdmin: user.isAdmin,
        test: "ok",
    }, cert, {
        audience: "https://lgu-backend.dispatch.sh/",
        algorithm: "RS256",
    })

    res.json({ token })
}))

// Load in all needed routes

const modules = fs.readdirSync("./routes")
const params = { app, wrap }

for (let module of modules) {
    if (module.includes(".")) {
        try {
            require("./routes/" + module)(params)
        } catch (error) {
            console.error(error, `Failed to load ${module}.`)
            process.exit(1)
        }
        continue;
    }
}

app.listen(8080, () => {
    console.log("Server started")
})
