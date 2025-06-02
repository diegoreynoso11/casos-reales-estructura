import fs from 'fs'
import { FormatRes } from '../utils/formatRes.js'
export async function getRoutes (req, res) {
  const response = new FormatRes(res)
  if (req.url === '/') {
    return response.send(200, {
      message: 'Api simple estructura - http + mySQL',
      routes: {
        '/get/all': 'Traer todos los items',
        '/get/id/:id': 'Traer un elemento por su ID',
        '/get/name/:name': 'Traer un elemento por su nombre',
        '/product/add/': 'Crear un nuevo elemento',
        '/product/update/:id': 'Editar un elemento existente',
        '/product/delete/:id': 'Eliminar un elemento existente'
      }
    })
  } else if (req.url === '/get/all') {
    const data = fs.readFileSync('data/data.json', 'utf8')
    response.success(JSON.parse(data))
  } else if (req.url.startsWith('/get/id/')) {
    const id = req.url.split('/').pop()
    const data = fs.readFileSync('data/data.json', 'utf8')
    const items = JSON.parse(data)
    const findItem = items.find(item => item.id === Number(id))
    return response.success(findItem || { error: 'Item no encontrado' })
  } else if (req.url.startsWith('/get/name/')) {
    const name = req.url.split('/').pop()
    const data = fs.readFileSync('data/data.json', 'utf8')
    const items = JSON.parse(data)
    const findedData = []
    items.forEach((i) => {
      const find = i.name.toLowerCase().includes(name.toLowerCase())
      if (!find) return
      findedData.push(i)
    })
    if (findedData.length === 0) {
      return response.notFound('No se encontraron productos con ese nombre')
    }
    return response.success(findedData)
  } else {
    return response.notFoundRoute()
  }
}
