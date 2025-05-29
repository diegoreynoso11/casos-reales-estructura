import fs from 'fs'
export async function putRoutes (req, res) {
  if (req.url.includes('/product/update/')) {
    let body = ''
    const id = req.url.split('/').pop()
    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      if (!body) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ status: 405, error: 'Cuerpo vacío' }))
      }
      try {
        const rawData = fs.readFileSync('data/data.json', 'utf8')
        const products = JSON.parse(rawData)
        // Encontrar el producto por ID recibido del body
        const findedProduct = products.find(product => product.id === Number(id))
        if (!findedProduct) {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ status: 404, error: 'El producto no existe en la base de datos' }))
        }
        const parsedBody = JSON.parse(body)
        // Editar el producto
        const newProduct = { ...findedProduct, ...parsedBody }
        // validar que el body no sea igual al producto encontrado
        const invalidProduct = findedProduct.name === parsedBody.name && findedProduct.description === parsedBody.description
        if (invalidProduct) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ status: 304, error: 'El producto ya contiene esos datos' }))
        }
        // Productos sin el producto editado
        const filteredProducts = products.filter(product => product.id !== Number(id))
        // Agregar el producto editado al final del array
        const updatedProducts = [...filteredProducts, newProduct]
        // Escribir el json actualizado con filesystem
        fs.writeFileSync('data/data.json', JSON.stringify(updatedProducts, null, 2), 'utf8')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 201, message: 'Producto actualizado con éxito' }))
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ status: 505, error: 'Formato JSON inválido' }))
      }
    })
  }
}
