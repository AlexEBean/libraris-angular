require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require("./controllers/authController")
const { checkUser, checkAdmin } = require("./middleware")
const userCtrl = require("./controllers/userController")

const bookCtrl = require("./controllers/bookController")
const holdCtrl = require("./controllers/holdController")

const awsCtrl = require("./controllers/awsController")
const emailCtrl = require("./controllers/emailController")

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

const path = require('path')

app.use(express.json())
app.use(express.static(`${__dirname}/../build`))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(database => {
    app.set("db", database)
    console.log("Connected to DB")
})

//# Auth
app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
app.get('/auth/refresh', authCtrl.refresh)
app.post("/auth/view", authCtrl.addView)

// # Books
app.get("/api/books", bookCtrl.getBooks)
app.post("/api/book", checkAdmin, bookCtrl.addBook)
app.delete("/api/book/:bookId", checkAdmin, bookCtrl.deleteBook)

// # Holds
app.get("/api/holds", checkAdmin, holdCtrl.getHolds)
app.get("/api/hold/:userId", checkUser, holdCtrl.getHold)
app.post("/api/hold/:bookId", checkUser, holdCtrl.addHold)
app.delete("/api/hold/:holdId", checkUser, holdCtrl.deleteHold)

// # Additional Technologies
app.get("/api/signs3", checkUser, awsCtrl.config)
app.post("/api/signs3", checkUser, awsCtrl.deleteProfilePic)
app.put("/api/user", checkUser, awsCtrl.updateProfilePic)
app.post("/api/email", emailCtrl.email)

//# Icebox Endpoints
app.get("/api/user", checkUser, userCtrl.getUser)
app.get("/api/users", checkAdmin, userCtrl.getUsers)
app.put("/api/user/:userId", checkAdmin, userCtrl.updateUser)
app.delete("/api/user/:userId", checkAdmin, userCtrl.deleteUser)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`))