const express = require("express")
const mongodb = require("mongodb")
const mongoose = require("mongoose")

const port = 8001
const app = express()
app.use(express.json())

const connectionString = "mongodb://root:123456@localhost:27017/?authMechanism=DEFAULT"
mongoose
.connect(connectionString)
.then(() => console.log("Database connection successful"))
.catch((error)=> console.log(error))

const errorMiddleware = (error, req, res, next) => {
    res.status(500).send(error.message)
}

app.use(errorMiddleware)

app.listen(port, () => {
    console.log("Server is runing on port " + port)
})