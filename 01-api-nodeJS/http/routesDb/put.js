import { FormatRes } from '../utils/formatRes.js'
import pool from './config/db.js'
export async function putRoutesDb (req, res) {
  const response = new FormatRes(res)
  if (req.url.startsWith('/product/update/')) {
    const id = req.url.split('/').pop()
    if (!id) {
      return response.badRequest('ID del producto es obligatorio')
    }
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', async () => {
      if (!body) {
        return response.notFound('Cuerpo de la solicitud vacío')
      }
      const { name, description = '' } = JSON.parse(body)
      try {
        const [product] = await pool.query(
          'SELECT * FROM products WHERE id = ?',
          [id]
        )
        if (product.length === 0) {
          return response.notFound('Producto no encontrado')
        }
        const currProduct = product[0]
        if (currProduct.name === name && currProduct.description === description) {
          return response.badRequest('No se han realizado cambios en el producto')
        }
        await pool.query(
          'UPDATE products SET name = ?, description = ? WHERE id = ?',
          [name, description, id]
        )
        return response.success({ message: 'Producto actualizado correctamente' })
      } catch (error) {
        return response.serverError()
      }
    })
  } else {
    return response.notFoundRoute()
  }
}
