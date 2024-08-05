const express = require("express")
const mongodb = require("mongodb")
const port = 8000
const app = express()
app.use(express.json())

const connectionString = "mongodb://root:123456@localhost:27017/?authMechanism=DEFAULT"
const client = new mongodb.MongoClient(connectionString)
client.connect()
    .then(() => console.log("Database connection successful"))
    .catch((error) => console.log(error))
const db = client.db("schoolDb")
const studentRepository = db.collection("students")

app.post("/student", (req, res, next) => {
    student = req.body
    // student= {
    //     name: "John Doe",
    //     email: "john@gmail.com",
    //     age: 22
    // }
    studentRepository.insertOne(student)
        .then((data) => {
            console.log(data)
            res.status(201).send({ id: data.insertedId, message: "Estudiante agregado" })
        })
})

app.get("/student", (req, res, next) => {
    const { email } = req.query
    studentRepository.findOne({ email: email })
        .then((data) => {
            if (data == null)
                return res.status(404).json({ message: "Estudiante no encontrado" })
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).send("valio pepino")
        })
})

app.put("/student", (req, res, next) => {
    const { email } = req.query
    const { dept } = req.body
    studentRepository.findOneAndUpdate({email},{$set:{dept:dept}})
    then((data)=>{
        console.log(data)
        res.status(200).json({message: "Student updated successfullly"})
    })
})

app.delete("/student", (req, res, next)=>{
    const {email} = req.query
    studentRepository.findOneAndDelete({email})
    .then(
        ()=> res.status().json({message: "Student deleted successfully"})
    )
})

const errorMiddleware = (error, req, res, next) => {
    res.status(500).send(error.message)
}

app.use(errorMiddleware)

app.listen(port, () => {
    console.log("Server is runing on port " + port)
})