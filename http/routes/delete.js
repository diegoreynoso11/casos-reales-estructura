import fs from 'fs'
export async function deleteRoutes (req, res) {
  if (req.url.includes('/product/delete/')) {
    const id = req.url.split('/').pop()
    const rawData = fs.readFileSync('data/data.json', 'utf8')
    const products = JSON.parse(rawData)
    const findedProduct = products.find(product => product.id === Number(id))
    if (!findedProduct) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ status: 404, error: 'El producto no existe en la base de datos' }))
    }
    const filteredProducts = products.filter(product => product.id !== Number(id))
    fs.writeFileSync('data/data.json', JSON.stringify(filteredProducts, null, 2), 'utf8')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 200, message: 'Producto eliminado con exito' }))
  }
}
