import { Router } from 'express'
import data from '../data/data.json' assert { type: 'json' };
const router = Router()

router.get('/all', (req, res) => {
  res.send(data)
})
router.get('/id/:id', (req, res) => {
  const id = req.params.id
  const item = data.find(d => d.id === parseInt(id))
  if (item) {
    res.send(item)
  } else {
    res.status(404).send({ error: 'Producto no encontrado' })
  }
})
router.get('/name/:name', (req, res) => {
  const name = req.params.name
  const findedData = []
  data.map((i) => {
    const find = i.name.toLowerCase().includes(name.toLowerCase())
    if (!find) return
    findedData.push(i)
  })
  if (findedData.length > 0) {
    res.send(findedData)
  } else {
    res.status(404).send({ error: 'Producto no encontrado' })
  }
})
export default router