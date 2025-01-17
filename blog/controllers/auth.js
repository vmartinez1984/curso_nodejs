const { User } = require("../models")

const signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        const newUser = new User({ name, email, password, role })
        await newUser.save()

        res.status(201).json({ message: "User registered succescfuly" })
    } catch (error) {
        next(error)
    }
}

module.exports = { signup }