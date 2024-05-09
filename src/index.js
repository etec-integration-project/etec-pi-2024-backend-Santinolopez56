import express from "express";

const app = express()

app.get('/',(req,res) => {
    res.send ("Andando")
})   

app.listen(3000)
console.log('Server on Port',3000)