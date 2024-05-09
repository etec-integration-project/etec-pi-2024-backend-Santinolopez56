import express from 'express'
import { createPool} from 'mysql2/promise'

const app = express()

const pool = createPool({
    host:'mysqldb',
    user:'root',
    password:'123456',
    port: 3306,
})

app.get('/',(req,res) => {
    res.send ("Andando")
})   

app.get('/ping', async (req,res) => {
    const result = await pool.query ('Select Now()')
    res.json (result[0])
})

app.listen(3000)
console.log('Server on Port',3000)