// back/config/db.js
import { createPool } from 'mysql2'

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_master',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
})

console.log('Conexión a MySQL exitosa')
pool.query('SET NAMES "utf8mb4"')

export default pool.promise()
