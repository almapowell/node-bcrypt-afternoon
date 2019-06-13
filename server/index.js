require('dotenv/config')
const express = require('express')
const session = require('express-session')
const massive = require('massive')

const app = express()
const { SESSION_SECRET, PORT, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected')
})

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


app.listen(PORT, () => console.log('port on', PORT))