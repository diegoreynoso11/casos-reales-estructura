import fs from 'fs'
export async function postRoutes (req, res) {
  if (req.url.includes('/product/add')) {
    let body = ''

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
        const nuevoProducto = JSON.parse(body)
        // creamos el id del nuevo producto
        const findedProduct = products.find(product => product.name === nuevoProducto.name)
        // validamos que el producto no existe para poder crearlo
        if (findedProduct && findedProduct.name === nuevoProducto.name) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ status: 304, error: 'El producto ya existe en la base de datos' }))
        }
        // ordenamos los productos para que el id no choque con los productos editados
        const sortedProducts = products.sort((a, b) => a.id - b.id)
        const id = products.length > 0 ? sortedProducts[products.length - 1].id + 1 : 1
        // Asignamos el id al nuevo producto
        nuevoProducto.id = id
        const allProducts = [...products, nuevoProducto]
        // Escribimos el json
        fs.writeFileSync('data/data.json', JSON.stringify(allProducts, null, 2), 'utf8')
        // Respondemos al cliente
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 201, message: 'Producto creado' }))
      } catch (error) {
        console.error('Error procesando POST:', error.message)
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Formato JSON inválido' }))
      }
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }))
  }
}
