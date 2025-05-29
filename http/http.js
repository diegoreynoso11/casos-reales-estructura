import http from 'http'
import { getRoutes } from './get.js'
import { postRoutes } from './post.js'
import { putRoutes } from './put.js'
import { deleteRoutes } from './delete.js'
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
  console.log(`Server running at http://localhost:${desiredPort}/`)
})
