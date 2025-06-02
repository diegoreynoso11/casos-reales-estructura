import fs from 'fs'
import { FormatRes } from '../utils/formatRes.js'
export async function postRoutes (req, res) {
  const response = new FormatRes(res)
  if (req.url.includes('/product/add')) {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      if (!body) {
        return response.badRequest('El cuerpo de la solicitud no puede estar vacío')
      }

      try {
        const rawData = fs.readFileSync('data/data.json', 'utf8')
        const products = JSON.parse(rawData)
        const nuevoProducto = JSON.parse(body)
        // creamos el id del nuevo producto
        const findedProduct = products.find(product => product.name === nuevoProducto.name)
        // validamos que el producto no existe para poder crearlo
        if (findedProduct && findedProduct.name === nuevoProducto.name) {
          return response.badRequest('El producto ya existe en la base de datos')
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
        return response.created({ message: 'Producto creado con éxito' })
      } catch (error) {
        return response.serverError('Error al procesar la solicitud')
      }
    })
  } else {
    return response.notFoundRoute()
  }
}
