const router = require ("express").Router()
const Person = require("../models/Person")

// Rotas da API

// Creat - Criação de dados
router.post("/", async (req,res)=>{

    // tratar dados que vem do body req.body
    const {name, salary, approved} = req.body

    // validar para ver se o nome foi enviado
    if (!name){
        res.status(422).json({error:" Name is required"});
        return
    }
    
    const person ={
        name,
        salary,
        approved,
    }

    try {
        // creat, vai criar dados no sistema
        await Person.create(person)
        res.status(201).json({message: "User add on system with sucess"})


    } catch (error) {
        res.status(500).json({error:error})
    }

})

// Read - leitura de dados

router.get("/", async(req,res)=>{

    try {
        // Retorar dados da collection
        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.get("/:id", async(req,res)=>{
  // extrair o dado da requisição, pela url = req.params
  const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json( {message:"User not found"})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error:error})

    }

})

// Update - Atualizar dados (PUT, PATCH)
router.patch("/:id", async(req,res)=>{

    const id = req.params.id
    const {name, salary, approved} = req.body

    const person ={
        name, salary, approved
    }

    try {
        const updatePerson = await Person.updateOne({_id: id}, person)
        // Atualizar se o usuário existe ou não 
        if(updatePerson.matchedCount === 0){
            res.status(422).json( {message:"User not found"})
            return
        }
        res.status(200).json(person)

    } catch (error) {
                res.status(500).json({error:error})

    }


})

// Delete - apagar dados

router.delete("/:id", async(req,res)=>{

        const id = req.params.id
        const person = await Person.findOne({_id: id})
        if(!person){
            res.status(422).json({message:"User not found"})
            return
        }

    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message: "User removed"})

    } catch (error) {
        res.status(500).json({error:error})

    }
})

module.exports= router