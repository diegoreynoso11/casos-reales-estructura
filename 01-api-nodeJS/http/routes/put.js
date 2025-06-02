import fs from 'fs'
import { FormatRes } from '../utils/formatRes.js'
export async function putRoutes (req, res) {
  const response = new FormatRes(res)
  if (req.url.includes('/product/update/')) {
    let body = ''
    const id = req.url.split('/').pop()
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
        // Encontrar el producto por ID recibido del body
        const findedProduct = products.find(product => product.id === Number(id))
        const notValid = products.find(product => product.name === body.name)
        if (notValid) {
          return response.badRequest('El nombre del producto ya existe')
        }
        if (!findedProduct) {
          return response.notFound('Producto no encontrado')
        }
        const parsedBody = JSON.parse(body)
        // Editar el producto
        const newProduct = { ...findedProduct, ...parsedBody }
        // validar que el body no sea igual al producto encontrado
        const invalidProduct = findedProduct.name === parsedBody.name && findedProduct.description === parsedBody.description
        if (invalidProduct) {
          return response.badRequest('El producto no ha cambiado, no se requiere actualización')
        }
        // Productos sin el producto editado
        const filteredProducts = products.filter(product => product.id !== Number(id))
        // Agregar el producto editado al final del array
        const updatedProducts = [...filteredProducts, newProduct]
        // Escribir el json actualizado con filesystem
        fs.writeFileSync('data/data.json', JSON.stringify(updatedProducts, null, 2), 'utf8')
        return response.success({ message: 'Producto actualizado con éxito' })
      } catch (error) {
        return response.serverError('Error al procesar la solicitud')
      }
    })
  } else {
    return response.notFoundRoute()
  }
}
