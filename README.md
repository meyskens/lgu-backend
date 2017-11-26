## How to deploy 
`docker run -e MONGOUSER=<user> -e MONGOPASS=<pass> -e MONGOHOST=<host> -e MONGOPORT=<port> -e MONGODB=<dbname> -p 8080:80 maartje/lgu-backend`

Set up user accounts:
`docker run -e MONGOUSER=<user> -e MONGOPASS=<pass> -e MONGOHOST=<host> -e MONGOPORT=<port> -e MONGODB=<dbname> maartje/lgu-backend node adduser.js`
```json
{
    email: "admin@lgu.be",
    password: "admin",
    phone: "0465808537",
    firstName: "Admin",
    lastName: "Person",
    isAdmin: true,
    contact: "email"
}
```
```json
{
    email: "user@lgu.be",
    password: "user",
    phone: "0465808537",
    firstName: "Admin",
    lastName: "Person",
    isAdmin: true,
    contact: "email"
}
```