import http from 'http'
import { getRoutes } from './routes/get.js'
import { postRoutes } from './routes/post.js'
import { putRoutes } from './routes/put.js'
import { deleteRoutes } from './routes/delete.js'

const desiredPort = 3000

function requestHandler (req, res) {
  if (req.method === 'GET') {
    getRoutes(req, res)
  } else if (req.method === 'POST') {
    postRoutes(req, res)
  } else if (req.method === 'PUT') {
    putRoutes(req, res)
  } else if (req.method === 'DELETE') {
    deleteRoutes(req, res)
  }
}

const server = http.createServer(requestHandler)
server.listen(desiredPort, () => {
  console.log(`Servidor con MOCK corriendo en http://localhost:${desiredPort}/`)
})
