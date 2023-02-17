const http = require("http")

const express = require("express")

const app = express()

app.use((req, res, next) => {
    console.log("1")
    next()
})

app.use((req, res, next) => {
    console.log('second')
    next()
})

app.use("/users", (req, res, next) => {
    res.send("users")
})

app.use("/", (req, res, next) => {
    res.send("root")
})


app.listen(3002)