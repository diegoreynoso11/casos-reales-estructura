import pool from './config/db.js'
import { FormatRes } from '../utils/formatRes.js'
export async function deleteRoutesDb (req, res) {
  const response = new FormatRes(res)
  if (req.url.startsWith('/product/delete/')) {
    const id = req.url.split('/').pop()
    try {
      const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id])
      if (result.affectedRows === 0) {
        return response.notFound('Producto no encontrado')
      }
      return response.success({ message: 'Producto eliminado correctamente' })
    } catch (error) {
      return response.serverError('Error al eliminar el producto')
    }
  } else {
    return response.notFoundRoute()
  }
}
