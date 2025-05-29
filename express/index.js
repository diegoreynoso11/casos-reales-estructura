import express, { json } from 'express'
import getRoutes from './getRoutes.js'

const app = express()
const port = 3000

app.use(json())

app.get('/', (req, res) => {
  res.send(`
        <h1>Api simple estructura</h1>
        <h2>/get/all para traer todos los items</h2> 
        <h2>/get/id/:id para traer solo un elemento por su ID.</h2>
        <h2>/get/name/:name para traer un elemento por su nombre.</h2>`)
})
app.use('/get', getRoutes)

app.listen(port, () => {
  console.log(`Corriendo en : http://localhost:${port}`)
})
