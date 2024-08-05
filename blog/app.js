const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config()
const connetionMongoDb = require('./init/mongodb')
const { authRoute } = require("./routes")

//init app
const app = express()
//connect database
connetionMongoDb();

//midlewhare
app.use(express.json({ limit: "500mb" }))
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }))
app.use(morgan("dev")) 

//route section
app.use("/api/v1/auth", authRoute)

module.exports = app