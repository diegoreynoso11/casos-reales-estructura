import http from 'http'
import { getRoutesDb } from './routesDb/get.js'
import { deleteRoutesDb } from './routesDb/delete.js'
import { putRoutesDb } from './routesDb/put.js'
import { postRoutesDb } from './routesDb/post.js'
const desiredPort = 3000

function requestHandler (req, res) {
  if (req.method === 'GET') {
    getRoutesDb(req, res)
  } else if (req.method === 'POST') {
    postRoutesDb(req, res)
  } else if (req.method === 'PUT') {
    putRoutesDb(req, res)
  } else if (req.method === 'DELETE') {
    deleteRoutesDb(req, res)
  }
}

const server = http.createServer(requestHandler)
server.listen(desiredPort, () => {
  console.log(`Servidor con DB corriendo en http://localhost:${desiredPort}/`)
})
