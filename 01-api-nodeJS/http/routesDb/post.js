import pool from './config/db.js'
import { FormatRes } from '../utils/formatRes.js'
export async function postRoutesDb (req, res) {
  const response = new FormatRes(res)
  if (req.url.startsWith('/product/add')) {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', async () => {
      if (!body) {
        return response.notFound('Cuerpo de la solicitud vacío')
      }
      const { name, description = '' } = JSON.parse(body)
      if (!name) {
        return response.badRequest('El nombre del producto es obligatorio')
      }
      try {
        const [find] = await pool.query(
          'SELECT * FROM products WHERE name = ?',
          [name]
        )
        if (find.length > 0) {
          return response.badRequest('El producto ya existe')
        }
        await pool.query(
          'INSERT INTO products (name, description) VALUES (?, ?)',
          [name, description]
        )
        return response.success({ message: 'Producto creado exitosamente' })
      } catch (error) {
        return response.serverError()
      }
    })
  } else {
    return response.notFoundRoute()
  }
}
