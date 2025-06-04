import pool from './config/db.js'
import { FormatRes } from '../utils/formatRes.js'
export async function getRoutesDb (req, res) {
  const response = new FormatRes(res)
  if (req.url === '/') {
    return response.success({
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
    try {
      const [rows] = await pool.query('SELECT * FROM products')
      if (!rows.length) {
        return response.notFound('No se encontraron productos')
      }
      return response.success(rows)
    } catch (error) {
      return response.serverError('Error al obtener los productos')
    }
  } else if (req.url.startsWith('/get/id/')) {
    const id = req.url.split('/').pop()
    try {
      const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
      if (!rows.length) {
        return response.notFound('Producto no encontrado')
      }
      return response.success(rows)
    } catch (error) {
      return response.serverError('Error al buscar los datos')
    }
  } else if (req.url.startsWith('/get/name/')) {
    const name = req.url.split('/').pop()
    try {
      const queryString = 'SELECT * FROM products WHERE name LIKE ?'
      const [rows] = await pool.query(queryString, ['%' + name + '%'])
      if (rows.length === 0) {
        return response.notFound('Producto no encontrado')
      }
      return response.success(rows)
    } catch (error) {
      return response.serverError('Error al buscar los datos')
    }
  } else {
    return response.notFoundRoute()
  }
}
