const users = require("./data/users")


const setup = async () => {
    await users.add({
        email: "admin@lgu.be",
        password: "admin",
        phone: "0465808537",
        firstName: "Admin",
        lastName: "Person",
        isAdmin: true,
        contact: "email"
    })

    await users.add({
        email: "user@lgu.be",
        password: "user",
        phone: "0465808537",
        firstName: "Admin",
        lastName: "Person",
        isAdmin: true,
        contact: "email"
    })
}

setup()
