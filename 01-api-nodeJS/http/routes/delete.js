import fs from 'fs'
import { FormatRes } from '../utils/formatRes.js'
export async function deleteRoutes (req, res) {
  const response = new FormatRes(res)
  if (req.url.includes('/product/delete/')) {
    const id = req.url.split('/').pop()
    const rawData = fs.readFileSync('data/data.json', 'utf8')
    const products = JSON.parse(rawData)
    const findedProduct = products.find(product => product.id === Number(id))
    if (!findedProduct) {
      return response.notFound('El producto no existe en la base de datos')
    }
    const filteredProducts = products.filter(product => product.id !== Number(id))
    fs.writeFileSync('data/data.json', JSON.stringify(filteredProducts, null, 2), 'utf8')
    return response.success({ message: 'Producto eliminado con éxito' })
  }
}
