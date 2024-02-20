// Config inicial (chamar pacotes instalados)
const express = require("express");
const app = express() // Executa(inicializa) express como função
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
require("dotenv").config()

const dbName = "Cluster0";
// Form de ler json / para configuar o json utilizamos middleware
app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

// Rotas api
const personRoutes = require("./routes/personRoutes")
app.use("/person", personRoutes)

// Rota inicial / endPoint
app.get("/", (req, res)=>{

    // mostrar req

    // a resposta para / vai ser um json
    res.json({message: "Active"})

})

// Entregar uma porta(serve para o express ser escutado pelo postman ou web)
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.dvqr8t8.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
console.log("Connected to MongoDB")
app.listen(3000)})
.catch((err) => console.log(err))
