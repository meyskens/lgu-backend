const express = require("express")
const app = express()
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

// security keys
const publicKey = fs.readFileSync("./keys/publicKey.pem");
const cert = fs.readFileSync("./keys/signingKey.pem");

// db objects
const users = require("./data/users")

app.use("/v1/user/*", expressJwt({
    secret: publicKey,
    audience: "https://lgu-backend.dispatch.sh/",
}));

app.all("/control/*", function checkToken(req, res, next) {
    wait.launchFiber(() => {
        let [scheme, token] = req.headers.authorization.split(" ");
        if (!/^Bearer$/i.test(scheme)) {
            return next(new BadRequestError("No token was found in the Authorization header."));
        }
        req.token = token;
        return next(); // allow request to continue
    });
});

app.post("/v1/login", wrap(async (req, res) => {
    if (typeof req.body.email === "undefined" || typeof req.body.password === "undefined") {
        throw new BadRequestError("Missing data");
    }
   
    const correct = uses.checkLogin(req.body.email, req.body.password)
    if (!correct) {
        return res.status(401).json({
            error: "Wrong login",
            result: "error",
        });
    }

    const token = jwt.sign({
        email: req.body.email,
        test: "ok",
    }, cert, {
        expiresInMinutes: 60,
        audience: "https://lgu-backend.dispatch.sh/",
        algorithm: "RS256",
    });
    await invalidateCacheForEmail(req.body.email);
    res.json({ token });
}));


app.get("/", (req, res) => {
    res.send("Hello world, let's serve urban!")
})

app.listen(80, () => {
    console.log("Server started")
})
