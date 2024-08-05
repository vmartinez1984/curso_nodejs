const mongoose = require("mongoose")
const { connectionUrl } = require('../config/kyes')

const connectionMongoDb = async () => {
    try {
        console.log(connectionUrl)
        await mongoose.connect(connectionUrl)
        console.log("Database connection secceful")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectionMongoDb